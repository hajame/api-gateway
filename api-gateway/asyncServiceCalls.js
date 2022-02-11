import axios from 'axios';

const serviceEndpoints = ['http://product-service:3000/api/products', 'http://review-service:3001/api/reviews']

async function fetchProductsAndReviews() {
    const allEndpoints = serviceEndpoints.map(endpoint => axios(endpoint));
    const results = await Promise.all(allEndpoints);
    const products = results[0].data;
    const reviews = results[1].data;
    return { products, reviews };
}

async function fetchSingleProductAndReviews(productid) {
    let singleProductEndpoints = [`${serviceEndpoints[0]}/${productid}`, `${serviceEndpoints[1]}/product/${productid}`];
    console.log('endpoints', singleProductEndpoints);

    const allEndpoints = singleProductEndpoints.map(endpoint => axios(endpoint));
    const results = await Promise.all(allEndpoints);
    let product = results[0].data;
    let reviews = results[1].data;
    return { product, reviews };
}

export {
    fetchProductsAndReviews,
    fetchSingleProductAndReviews
}
