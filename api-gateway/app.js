import axios from 'axios'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { tinyLogger, unknownEndpoint, errorHandler } from './middleware.js'
import { getReviewTotals } from './reviewCounter.js'

const app = express()
app.use(cors())
app.use(morgan(tinyLogger))

const serviceEndpoints = ['http://product-service:3000/api/products', 'http://review-service:3001/api/reviews']

// API FOR WEB BROWSERS
app.get('/api/web/products/', async (req, res) => {
    try {
        let { products, reviews } = await fetchProductsAndReviews()
        const reviewTotals = getReviewTotals(reviews)
        products = products.map(p => { return addReviewFields(reviewTotals, p) })
        
        return res.status(200).json(products)
    } catch (error) {
        //return sendError(res, error)
    }
})

app.get('/api/web/products/:productid', async (req, res) => {
    try {
        const reviewResult = await axios.get('http://review-service:3001/api/reviews/product/'+req.params.productid)
        const productResult = await axios.get('http://product-service:3000/api/products/'+req.params.productid)
        const reviews = reviewResult.data
        let product = productResult.data
        product.reviews = reviews ? reviews : []

        return res.status(200).json(product)
    } catch (error) {
        return sendError(res, error)
    }
})


// API FOR MOBILE APPLICATIONS
app.get('/api/mobile/products/', async (req, res) => {
    try {
        let { products, reviews } = await fetchProductsAndReviews()        
        const reviewTotals = getReviewTotals(reviews)
        
        let tinyProducts = products.map(p =>  {
            if (p.description.length > 100) {
                p.description = p.description.substring(0, 100) + '...'
            }
            return addReviewFields(reviewTotals, p)
        })
        
        return res.status(200).json(tinyProducts)
    } catch (error) {
        return sendError(res, error)
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
        return sendError(res, error)
    }
})

const PORT = 4000
app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(PORT, function () {
    console.log(`Server listening on port ${PORT}`)
})

async function fetchProductsAndReviews() {
    const allEndpoints = serviceEndpoints.map(endpoint => axios(endpoint))
    const results = await Promise.all(allEndpoints)
    let products = results[0].data
    const reviews = results[1].data
    return { products, reviews }
}

function sendError(res, error) {
    return res.status(502).json({ 
        error: { 
            status: '502 Bad Gateway', 
            service_error: buildServiceError(error)   // attach error coming from the service
        } 
    })
}

function buildServiceError(error) {
    return {
        message: error.message,
        url: error.config.url,
        method: error.config.method
    }
}

function addReviewFields(reviewTotals, product) {
    const productRating = reviewTotals.get(product.productid)
    product.rating_count = productRating.count
    product.rating_avg = parseInt(productRating.rating_sum) / parseInt(productRating.count)
    return product
}


