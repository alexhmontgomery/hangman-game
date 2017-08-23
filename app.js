const express = require('express')
const mustache = require('mustache-express')
const app = express()

app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.set('views', './views')
app.use(express.static('public'))

const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log('Server ON! Go to port:' + port)
})

const main = require('./routes/main')

app.use('/', main)
