import axios from 'axios'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { tinyLogger, unknownEndpoint, errorHandler } from './middleware.js'

const app = express()
app.use(cors())
app.use(morgan(tinyLogger))

app.get('/api/web/products/', async (req, res) => {
    try {
        const productResult = await axios.get('http://product-service:3000/api/products')
        const reviewResult = await axios.get('http://review-service:3001/api/reviews')
        let products = productResult.data
        const reviews = reviewResult.data
        
        const reviewTotals = countReviewTotals(reviews)
        
        products = products.map(p => {
            addReviewFields(reviewTotals, p)
            return p
        })
        
        return res.status(200).json(products)
    } catch (error) {
        return res.status(403).json({ error: 'unexpexted error happened.' })
    }
})

app.get('/api/mobile/products/', async (req, res) => {
    try {
        const productResult = await axios.get('http://product-service:3000/api/products')
        const reviewResult = await axios.get('http://review-service:3001/api/reviews')
        let products = productResult.data
        const reviews = reviewResult.data
        
        const reviewTotals = countReviewTotals(reviews)
        
        let tinyProducts = products.map(p =>  {
            if (p.description.length > 100) {
                p.description = p.description.substring(0, 100) + '...'
            }
            addReviewFields(reviewTotals, p)
            return p
        })
        
        return res.status(200).json(tinyProducts)
    } catch (error) {
        return res.status(403).json({ error: 'unexpexted error happened.' })
    }
})

const PORT = 4000
app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(PORT, function () {
    console.log(`Server listening on port ${PORT}`)
})

function addReviewFields(reviewTotals, p) {
    const productRating = reviewTotals.get(p.productid)
    p.rating_count = productRating.count
    p.rating_avg = parseInt(productRating.rating_sum) / parseInt(productRating.count)
}

function countReviewTotals(reviews) {
    let reviewTotals = new Map()
    reviews.forEach(review => {
        let total = reviewTotals.get(review.productid)
        if (!total) {
            total = { count: 0, rating_sum: 0 }
        }
        total.count = total.count + 1
        total.rating_sum = total.rating_sum + review.rating
        reviewTotals.set(review.productid, total)
    })
    return reviewTotals
}
