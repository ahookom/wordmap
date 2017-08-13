
import {wordIdMemo, nodesArr} from './wordNodeTools.js'
import {getPossibleWords} from '../wordutilsModule.js'

const addNextGeneration = ()=>{
  let nodes = window.nodes
  let edges = window.edges
  let idsSoFar = window.idsSoFar
  let nextGeneration = []
  window.previousGeneration.forEach((node) => {
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
  window.previousGeneration = nextGeneration
  console.log('click registered')
}

export default addNextGeneration
