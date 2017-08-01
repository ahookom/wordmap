
import {filteredNodes, nodesArr, wordIdMemo} from './nodes.js'
// import adjacencyList from '../utils/adjacencyList.js'
import {getPossibleWords} from '../utils/wordutils.js'



let edgesArr = []
filteredNodes.forEach((node) => {
  let adjacentWords = getPossibleWords(node.label.toUpperCase())
  adjacentWords.forEach(dest => {
    if(wordIdMemo[dest]>node.id && wordIdMemo[dest]<100)edgesArr.push({from: node.id, to: wordIdMemo[dest]})
  })
})

export default edgesArr
