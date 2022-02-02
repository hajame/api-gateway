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
        const products = productResult.data
        return res.status(200).json(products)
    } catch (error) {
        return res.status(403).json({ error: 'unexpexted error happened.' })
    }
})

app.get('/api/mobile/products/', async (req, res) => {
    try {
        const productResult = await axios.get('http://product-service:3000/api/products')
        const tinyProducts = productResult.data.map(p =>  {
            if (p.description.length > 100) {
                p.description = p.description.substring(0, 100) + '...'
            }
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