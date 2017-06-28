function checkIfAlreadyGuessed (guess, guessesArray) {
  let reply = false
  for (var i = 0; i < guessesArray.length; i++) {
    if (guess === guessesArray[i]) {
      reply = true
    }
  }
  return reply
}

function inputCorrectGuess (guess, wordArray, solution) {
  for (var g = 0; g < wordArray.length; g++) {
    if (guess === wordArray[g]) {
      solution[g] = guess
    }
  }
  return solution
}

module.exports = {
  checkIfAlreadyGuessed: checkIfAlreadyGuessed,
  inputCorrectGuess: inputCorrectGuess
}
