const express = require('express')
const app = express()
const cors = require('cors')
let reviews = require('./db')

app.use(cors())

const PORT = 3001

app.get('/api/reviews/', function(req, res) {
    res.status(200).send(reviews)
})

app.listen(PORT, function() {
    console.log(`Server listening on port ${PORT}`)
})