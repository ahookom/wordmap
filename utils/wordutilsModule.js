let Dictionary = require('./DictionaryModule.js')
let scrabbleWordArr = window.words

let now = Date.now()
const dictionary = new Dictionary(scrabbleWordArr);
console.log('dictionary build took', Date.now()-now)
function isValidWord(word) {
    return dictionary.search(word);
}
// console.log(dictionary.possibleNextLetters('S'))
// console.log(dictionary.possiblePrevLetters('S'))
// console.log(dictionary.possibleLettersBetween('ST','RT'))
// console.log(newGetPossibleWords('START'))
// console.log(newGetPossibleWords('MERRY'))
// speedTest(1000)
function speedTest(cases){
  let testWords = []
  let oldTime = 0
  let newTime = 0
  for(let i = 0; i<cases;i++){
    testWords.push(scrabbleWordArr[Math.floor(Math.random()*scrabbleWordArr.length)])
  }
  let t = Date.now()
  testWords.forEach(word=>{
    getPossibleWords(word)
  })
  oldTime = Date.now()-t
  t = Date.now()
  testWords.forEach(word=>{
    newGetPossibleWords(word)
  })
  newTime = Date.now()-t
  console.log('old way took', oldTime)
  console.log('new way took', newTime)
}


function newGetPossibleWords(word, cards = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')) {
  let possibleWords = []
  for(let i = 0; i<word.length; i++){
    let currChar = word[i]
    let prefix = word.slice(0,i)
    let suffix = word.slice(i+1)
    //check char removal
    if(isValidWord(prefix+suffix))possibleWords.push(prefix+suffix)
    //check char swap
    let possibleLetters = dictionary.possibleLettersBetween(prefix,suffix)
    possibleLetters.forEach(letter=>{
      if(isValidWord(prefix+letter+suffix))possibleWords.push(prefix+letter+suffix)
    })
    //check char insertion before this char
    possibleLetters = dictionary.possibleLettersBetween(prefix,currChar+suffix)
    possibleLetters.forEach(letter=>{
      if(isValidWord(prefix+letter+currChar+suffix))possibleWords.push(prefix+letter+currChar+suffix)
    })
    if(i===word.length-1){
      //check adding to the end
      possibleLetters = dictionary.possibleLettersBetween(word,'')
      possibleLetters.forEach(letter=>possibleWords.push(word+letter))
    }
  }
  return possibleWords
}

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
