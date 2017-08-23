const fs = require('fs')
const Busboy = require('busboy')
const words = fs.readFileSync('./data/words.txt', 'utf-8').toLowerCase().split('\n')

function createNewWord (gameLevel) {
  let word = words[Math.floor(Math.random() * words.length)]
  if (gameLevel === 'easy') {
    while (word.length > 6 || word.length < 4) {
      console.log(word.length)
      word = words[Math.floor(Math.random() * words.length)]
    }
  } else if (gameLevel === 'medium') {
    while (word.length > 8 || word.length < 6) {
      console.log(word.length)
      word = words[Math.floor(Math.random() * words.length)]
    }
  } else if (gameLevel === 'hard') {
    while (word.length < 8) {
      console.log(word.length)
      word = words[Math.floor(Math.random() * words.length)]
    }
  }
  return word
}

function createBlankArray (arrayOfWord) {
  let solution = []
  for (var i = 0; i < arrayOfWord.length; i++) {
    solution.push(' _ ')
  }
  return solution
}

function resetCount (count) {
  count = 8
  return count
}

module.exports = {
  createNewWord: createNewWord,
  createBlankArray: createBlankArray,
  resetCount: resetCount
}
