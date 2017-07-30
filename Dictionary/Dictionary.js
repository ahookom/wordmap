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

export default Trie;
