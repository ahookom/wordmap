let scrabbleWordArr = window.words

export let wordIdMemo = {}

export const nodesArr = scrabbleWordArr.map((word, index) => {
  wordIdMemo[word] = index+1
  wordIdMemo[index+1]=word
  return {label: word.toLowerCase(), id: index + 1}
})

// export const filteredNodes = nodesArr.filter((node) => node.id < 100)

let id = Math.floor(Math.random()*nodesArr.length)
// export const filteredNodes = nodesArr.filter((node)=>node.id===id)
export const filteredNodes = [nodesArr[id]]
