import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { tinyLogger, unknownEndpoint, errorHandler } from './middleware.js'

const app = express()
app.use(cors())
app.use(morgan(tinyLogger))

import { products } from './db.js'

app.get('/api/products/', function (req, res) {
    res.status(200).send(products)
})

app.get('/api/products/:productId', function (req, res) {
    res.status(200).send(products.find(p => p.productid === req.params.productId))
})

const PORT = 3000
app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(PORT, function () {
    console.log(`Server listening on port ${PORT}`)
})