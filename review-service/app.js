import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { tinyLogger, unknownEndpoint, errorHandler } from './middleware.js'

const app = express()
app.use(cors())
app.use(morgan(tinyLogger))

import { reviews } from './db.js'

app.get('/api/reviews/', function (req, res) {
    res.status(200).send(reviews)
})

app.get('/api/reviews/:reviewId', function (req, res) {
    const foundReview = reviews.find(r => r.reviewid == req.params.reviewId)
    if (foundReview) {
        res.status(200).send(foundReview)
    } else {
        res.status(404).send({ error: 'cannot find review with reviewid ' + req.params.reviewId})
    }
})

app.get('/api/reviews/product/:productId', function (req, res) {
    const foundProductReviews = reviews.filter(r => r.productid == req.params.productId)
    if (foundProductReviews) {
        res.status(200).send(foundProductReviews)
    } else {
        res.status(404).send({ error: 'cannot find review with productid ' + req.params.productId})
    }
})

const PORT = 3001
app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(PORT, function () {
    console.log(`Server listening on port ${PORT}`)
})