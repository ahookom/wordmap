
import {wordIdMemo, nodesArr} from './wordNodeTools.js'
import {getPossibleWords} from '../wordutilsModule.js'

let initialNodeDistance = 200
let INCLUDE_ALL_CONNECTIONS = true
window.edgesMemo = {}

const addNextGeneration = ()=>{
  let start = Date.now()
  // setTimeout(()=>window.network.startSimulation(), 1000)
  let idsSoFar = window.idsSoFar
  let nextGeneration = []
  let nodesToAdd = []
  let edgesToAdd = []
  window.previousGeneration.forEach((node) => {
    let adjacentWords = getPossibleWords(node.label.toUpperCase())
    if(!window.edgesMemo[node.id])window.edgesMemo[node.id]={}
    adjacentWords.forEach(word => {
      let id = wordIdMemo[word]
      if(!idsSoFar[id]){
        let lowerCaseWord = word.toLowerCase()
        nextGeneration.push({label:lowerCaseWord, id: id})
        nodesToAdd.push({label:lowerCaseWord, id: id})
        edgesToAdd.push({from: node.id, to: id})
        // asyncAddNode(node.id, id, word.toLowerCase())
        // nodes.add({label: word.toLowerCase(), id: id})
        // edges.add({from: node.id, to: wordIdMemo[word]})
        idsSoFar[id]=true
      }else if(INCLUDE_ALL_CONNECTIONS && node.id < id && !window.edgesMemo[node.id][id]){
        edgesToAdd.push({from: node.id, to: id})
        window.edgesMemo[node.id][id]=true
      }
    })
  })
  window.previousGeneration = nextGeneration
  window.nodes.add(nodesToAdd)
  window.edges.add(edgesToAdd)
  console.log('click registered')
  setTimeout(window.nodes.flush,0)
  setTimeout(window.edges.flush,0)
  console.log((Date.now()-start)/1000)
}

function asyncAddNode(a,b,c){
  setTimeout(()=>addNode(a,b,c),0)
}

function addNode(oldNodeId, newNodeId, newNodeWord){
  let position = window.network.getPositions([oldNodeId])
  let newX = position[oldNodeId].x + (Math.random()-0.5)*initialNodeDistance
  let newY = position[oldNodeId].y + (Math.random()-0.5)*initialNodeDistance
  window.nodes.add({label: newNodeWord, id: newNodeId, x: newX, y: newY, allowedToMoveX: true, allowedToMoveY: true})
  window.edges.add({from: oldNodeId, to: newNodeId})
  // window.network.stopSimulation()
}

export default addNextGeneration
