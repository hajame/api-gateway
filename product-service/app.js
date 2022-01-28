const express = require('express')
const app = express()
const cors = require('cors')
let products = require('./db.js')

app.use(cors())

const PORT = 3000

app.get('/api/products/', function(req, res) {
    res.status(200).send(products)
})

app.listen(PORT, function() {
    console.log(`Server listening on port ${PORT}`)
})