var express = require('express')
var app = express()
const cors = require('cors')

app.use(cors())

const PORT = 3001

app.get('/api/reviews/', function (req, res) {
  res.send('List of reviews')
})

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`)
})