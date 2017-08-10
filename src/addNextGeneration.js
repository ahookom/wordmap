
import {wordIdMemo, nodesArr, filteredNodes} from './nodes.js'
import {getPossibleWords} from '../utils/wordutilsModule.js'

let lastGeneration = []
let idsSoFar = {}

const addNextGeneration = (nodes,edges)=>{
  let nextGeneration = []
  if(!lastGeneration.length){
    lastGeneration = filteredNodes
    filteredNodes.forEach(node=>idsSoFar[node.id]=true)
  }
  lastGeneration.forEach((node) => {
    let adjacentWords = getPossibleWords(node.label.toUpperCase())
    adjacentWords.forEach(word => {
      let id = wordIdMemo[word]
      if(!idsSoFar[id]){
        nextGeneration.push({label:word.toLowerCase(), id: id})
        nodes.add({label: word.toLowerCase(), id: id})
        edges.add({from: node.id, to: wordIdMemo[word]})
        idsSoFar[id]=true
      }
    })
  })
  lastGeneration = nextGeneration
  console.log('click registered')
}

export default addNextGeneration
