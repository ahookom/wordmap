let scrabbleWordArr = window.words

export let wordIdMemo = {}

export const nodesArr = scrabbleWordArr.map((word, index) => {
  wordIdMemo[word] = index+1
  wordIdMemo[index+1]=word
  return {label: word.toLowerCase(), id: index + 1}
})

export const fetchNodeByWord = (word) => {
  return nodesArr[wordIdMemo[word.toUpperCase()]-1]
}

export const fetchNodeById = (id) => {
  return nodesArr[id-1]
}
