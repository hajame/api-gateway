import axios from 'axios'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { tinyLogger, unknownEndpoint, errorHandler } from './middleware.js'
import { getReviewTotals } from './reviewCounter.js'

const app = express()
app.use(cors())
app.use(morgan(tinyLogger))

// API FOR WEB BROWSERS
app.get('/api/web/products/', async (req, res) => {
    try {
        const productResult = await axios.get('http://product-service:3000/api/products')
        const reviewResult = await axios.get('http://review-service:3001/api/reviews')
        let products = productResult.data
        const reviews = reviewResult.data
        
        const reviewTotals = getReviewTotals(reviews)
        
        products = products.map(p => {
            addReviewFields(reviewTotals, p)
            return p
        })
        
        return res.status(200).json(products)
    } catch (error) {
        return res.status(403).json({ error: 'unexpexted error happened.' })
    }
})

app.get('/api/web/products/:productid', async (req, res) => {
    try {
        const productResult = await axios.get('http://product-service:3000/api/products/'+req.params.productid)
        const reviewResult = await axios.get('http://review-service:3001/api/reviews/product/'+req.params.productid)
        let product = productResult.data
        const reviews = reviewResult.data
        product.reviews = reviews ? reviews : []

        return res.status(200).json(product)
    } catch (error) {
        return res.status(403).json({ error: 'unexpexted error happened.' })
    }
})


// API FOR MOBILE APPLICATIONS
app.get('/api/mobile/products/', async (req, res) => {
    try {
        const productResult = await axios.get('http://product-service:3000/api/products')
        const reviewResult = await axios.get('http://review-service:3001/api/reviews')
        let products = productResult.data
        const reviews = reviewResult.data
        
        const reviewTotals = getReviewTotals(reviews)
        
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

app.get('/api/mobile/products/:productid', async (req, res) => {
    try {
        const productResult = await axios.get('http://product-service:3000/api/products/'+req.params.productid)
        const reviewResult = await axios.get('http://review-service:3001/api/reviews/product/'+req.params.productid)
        let product = productResult.data
        let reviews = reviewResult.data.slice(0,3)  // limit the number of reviews on mobile
        
        reviews.map(r => {
            if (r.text.length > 100) {
                r.text = r.text.substring(0, 100) + '...'  // truncate long review texts
            }
        })
        product.reviews = reviews ? reviews : []

        return res.status(200).json(product)
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


