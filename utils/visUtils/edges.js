
import {filteredNodes, nodesArr, wordIdMemo} from './wordNodeTools.js'
import {getPossibleWords} from '../wordutilsModule.js'


let edgesArr = []
filteredNodes.forEach((node) => {
  let adjacentWords = getPossibleWords(node.label.toUpperCase())
  adjacentWords.forEach(dest => {
    if(wordIdMemo[dest]>node.id && wordIdMemo[dest]<100)edgesArr.push({from: node.id, to: wordIdMemo[dest]})
  })
})

export default edgesArr
