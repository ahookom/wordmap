let Dictionary = require('./DictionaryModule.js')
let scrabbleWordArr = require('./scrabbleWordArrModule.js')

const dictionary = new Dictionary(scrabbleWordArr);

function isValidWord(word) {
    return dictionary.search(word);
}
console.log(dictionary.possibleNextLetters('S'))
console.log(dictionary.possiblePrevLetters('S'))
console.log(dictionary.possibleLettersBetween('ST','RT'))

function getPossibleWords(word, cards = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')) {

  let possibleWords = [];
  const currentCards = cards;
  //try removing each letter
  for (let i = 0 ; i < word.length;i++){
    let newWord = word.slice(0, i) + word.slice(i + 1);
    if (isValidWord(newWord)){
      possibleWords.push(newWord)
    }
  }
  //try adding each letter to each position
  currentCards.forEach(letter => {
    for (let i = 0 ; i <= word.length;i++){
      let newWord = word.slice(0, i) + letter + word.slice(i);
      if (isValidWord(newWord)){
        possibleWords.push(newWord)
      }
    }
  })
  //try substituting each letter into each position
  currentCards.forEach(letter => {
    for (let i = 0 ; i < word.length;i++){
      let newWord = word.slice(0, i) + letter + word.slice(i + 1);
      if (isValidWord(newWord)){
        possibleWords.push(newWord)
      }
    }
  })
  possibleWords = possibleWords.filter(thisWord => thisWord !== word);
  return possibleWords;
}

module.exports={getPossibleWords, dictionary}
