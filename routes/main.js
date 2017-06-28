const express = require('express')
const router = express.Router()
const Word = require('../models/word')
const Guess = require('../models/guess')
const bodyParser = require('body-parser')
const session = require('express-session')

router.use(bodyParser.urlencoded({ extended: false }))

var word = ''
var wordArray = []
var solution = []
var solutionDisplay = ''
var sess
var count = 0
var guessesArray = []
var guesses = ''
var message = ''
var answer = ''

router.use(session({
  secret: 'alexisthegreatest',
  resave: false,
  saveUninitialized: true
}))

router.get('/', function (req, res) {
  res.render('index', {
    word: word,
    solutionDisplay: solutionDisplay,
    count: count,
    guesses: guesses,
    message: message,
    answer: answer
  })
})

router.post('/newGame', function (req, res) {
  resetAll()
  const level = req.body.newGame
  word = Word.createNewWord(level)
  wordArray = word.split('')
  console.log(wordArray)
  solution = Word.createBlankArray(wordArray)
  solutionDisplay = solution.join('')
  count = Word.resetCount(count)

  res.redirect('/')
})

router.post('/guess', function (req, res, next) {
  sess = req.session
  sess.guess = req.body.guess
  message = ''

  if (Guess.checkIfAlreadyGuessed(sess.guess, guessesArray) === true) {
    // letter already guessed
    message = 'This letter has already been guessed! Please try another.'
  } else {
    // letter not guessed & continue with evaluation
    guessesArray.push(sess.guess)
    guesses = guessesArray.join(', ')
    if (wordArray.indexOf(sess.guess) > -1) {
      solution = Guess.inputCorrectGuess(sess.guess, wordArray, solution)
      console.log(solution)
    } else {
      // letter incorrect
      count = count - 1
    }
  }

  if (count === 0) {
    // user loses
    message = 'Game over!! Unfortunately, you could not save him and Josh was executed.'
    answer = word
  }

  solutionDisplay = solution.join('')
  if (solutionDisplay === word) {
    // user wins
    message = 'CONGRATULATIONS! You win. Josh\'s life has been spared'
    count = 999
    answer = word
  }
  res.redirect('/')
})

function resetAll () {
  guessesArray = []
  guesses = ''
  message = ''
  answer = ''
}

module.exports = router
