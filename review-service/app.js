const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const middleware = require('./middleware.js')

const app = express()
app.use(cors())
app.use(morgan(middleware.tinyLogger))

let reviews = require('./db').reviews

app.get('/api/reviews/', function (req, res) {
    res.status(200).send(reviews)
})

const PORT = 3001
app.use(middleware.unkownEndpoint)
app.use(middleware.errorHandler)

app.listen(PORT, function () {
    console.log(`Server listening on port ${PORT}`)
})