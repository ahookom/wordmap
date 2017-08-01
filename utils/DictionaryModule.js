function Trie(){
  this.endOfWord = false;
  this.children = {};
}

Trie.prototype.addChild = function(letter){
  this.children[letter] = new Trie();
}
Trie.prototype.addChildren = function(letterArray){
  if (!letterArray.length) this.endOfWord = true;
  if (letterArray.length){
    let current = letterArray.shift();
    if (!this.children[current]) this.children[current] = new Trie();
    this.children[current].addChildren(letterArray);
  }
}

Trie.prototype.searchChildren = function(letterArr){
  let firstLetter = letterArr.shift();
  if (!this.children[firstLetter]){return false;}
  else {
    return letterArr.length ? this.children[firstLetter].searchChildren(letterArr) : this.children[firstLetter].endOfWord ;
  }
}

Trie.prototype.search = function(word){
  if (word.length) return this.searchChildren(word.split(''));
}

Trie.prototype.addWord = function(word){
  let letterArr = word.split('');
  let currentLetter = letterArr.shift();
  if (!this.children[currentLetter]) this.children[currentLetter] = new Trie();
  this.children[currentLetter].addChildren(letterArr);
}

Trie.prototype.bulkAddWords = function(arrOfWords){
  arrOfWords.forEach(word => this.addWord(word));
}

Trie.prototype.possibleNextLetters = function(prefix){
  let curr = 0
  let currNode = this
  while(curr<prefix.length){
    let currChar = prefix[curr++]
    if(!currNode.children[currChar]){
      return []
    }
    else currNode = currNode.children[currChar]
  }
  return Object.keys(currNode.children)
}


class TwoWayDictionary{
  constructor(words){
    this.prefixTrie = new Trie()
    this.prefixTrie.bulkAddWords(words)
    this.suffixTrie = new Trie()
    words.forEach(word=>{
      this.suffixTrie.addWord(word.split('').reverse().join(''))
    })
  }
  search(word){
    return this.prefixTrie.search(word)
  }
  possibleNextLetters(prefix){
    return this.prefixTrie.possibleNextLetters(prefix)
  }
  possiblePrevLetters(suffix){
    return this.suffixTrie.possibleNextLetters(suffix.split('').reverse().join(''))
  }
  possibleLettersBetween(prefix,suffix){
    let next = this.possibleNextLetters(prefix).sort()
    let prev = this.possiblePrevLetters(suffix).sort()
    let i = 0
    let j = 0
    let result = []
    while(i < next.length && j < prev.length){
      if(next[i]===prev[j]){
        result.push(next[i++])
        j++
      }
      else if(next[i]>prev[j]){
        j++
      }
      else if(next[i]<prev[j]){
        i++
      }
    }
    return result
  }
}

module.exports = TwoWayDictionary;
