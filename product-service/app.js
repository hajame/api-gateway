const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const middleware = require('./middleware.js')

const app = express()
app.use(cors())
app.use(morgan(middleware.tinyLogger))

let products = require('./db.js').products

app.get('/api/products/', function (req, res) {
    res.status(200).send(products)
})

const PORT = 3000
app.use(middleware.unkownEndpoint)
app.use(middleware.errorHandler)

app.listen(PORT, function () {
    console.log(`Server listening on port ${PORT}`)
})