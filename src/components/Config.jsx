import React from 'react'
import {dictionary} from '../../utils/wordutilsModule.js'
import {initializeNetwork, initializeNetworkOnWord} from '../../utils/visUtils/initializeNetwork.js'
import addNextGeneration from '../../utils/visUtils/addNextGeneration.js'
// import fs from 'fs'

export default (props)=>{
  return (
  <div>
    <button id="bubbleOut" onClick={bubbleOutHandler}>Next Layer</button>
    <form onSubmit={resetHandler}>
      <input type='text' id="start_word" />
      <button type='submit' id='start_new'>Start</button>
    </form>
    <button id='save' onClick={saveHandler}>Save in Browser</button>
    <button id='load' onClick={loadHandler}>Load from Browser</button>
    <button id='saveToFile' onClick={saveToFile}>Save to File</button>
    <button id='loadFile' onClick={loadSaved}>Load from File</button>
  </div>)
}

function saveHandler(){
  window.network.storePositions()
  let allNodes = window.nodes.get()
  window.localStorage.allNodes = JSON.stringify(allNodes)
  let allEdges = window.edges.get()
  window.localStorage.allEdges = JSON.stringify(allEdges)
}

function loadHandler(){
  if(window.nodes)window.nodes.clear()
  if(window.edges)window.edges.clear()
  let nodeArr = JSON.parse(window.localStorage.allNodes)
  let edgeArr = JSON.parse(window.localStorage.allEdges)
  let startTime = Date.now()
  initializeNetwork(nodeArr,edgeArr)
  console.log('initialization took', (Date.now()-startTime)/1000)
}

function bubbleOutHandler(event){
  addNextGeneration()
}

function resetHandler(e){
  e.preventDefault()
  let word = e.target.start_word.value.toUpperCase()
  if(dictionary.search(word)){
    console.log('made it here', word)
    initializeNetworkOnWord(word)
  }
}

function download(text, name, type) {
    var a = document.createElement("a");
    var file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}

function saveToFile(){
  window.network.storePositions()
  let allNodes = window.nodes.get()
  let allEdges = window.edges.get()
  let completeInfo = {
    nodes: allNodes,
    edges: allEdges
  }
  download(JSON.stringify(completeInfo), 'network.json', 'text/plain');
}

function loadSaved(){
  let networkInfo = window.savedNetwork
  initializeNetwork(networkInfo.nodes,networkInfo.edges)
}
