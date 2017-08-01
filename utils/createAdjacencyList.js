
let scrabbleWords = require('./scrabbleWordArrModule.js');

let wordUtils = require('./wordutilsModule.js');
let fs = require('fs')

let getPossibleWords = wordUtils.getPossibleWords
let adjacencyList = {}
let currFirst = 'A'
let edgesArr = []
scrabbleWords.forEach((word) => {
  if(word[0]>currFirst){
    console.log('processing',word[0])
    currFirst = word[0]
  }
  let adjacentWords = getPossibleWords(word)
  adjacencyList[word]=adjacentWords
})

fs.writeFileSync('./adjacencyList.js', `export default ${JSON.stringify(adjacencyList)}`)
