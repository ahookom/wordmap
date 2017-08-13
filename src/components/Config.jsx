import React from 'react'
import {dictionary} from '../../utils/wordutilsModule.js'
import initializeNetwork from '../../utils/visUtils/initializeNetwork.js'
import addNextGeneration from '../../utils/visUtils/addNextGeneration.js'

export default (props)=>{
  return (
  <div>
    <button id="bubbleOut" onClick={bubbleOutHandler}>Next Layer</button>
    <form onSubmit={resetHandler}>
      <input type='text' id="start_word" />
      <button type='submit' id='start_new'>Start</button>
    </form>
  </div>)
}

function bubbleOutHandler(event){
  // network.addNodeMode()
  addNextGeneration()
  // network.disableEditMode()
}

function resetHandler(e){
  e.preventDefault()
  let word = e.target.start_word.value.toUpperCase()
  if(dictionary.search(word)){
    console.log('made it here', word)
    initializeNetwork(word)
  }
}
