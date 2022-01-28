var express = require('express')
var app = express()
const cors = require('cors')

app.use(cors())

const PORT = 3000

app.get('/api/products/', function (req, res) {
  res.send('List of products')
})

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`)
})