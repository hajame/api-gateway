# API gateway
An experimental [API gateway](https://microservices.io/patterns/apigateway.html) for two simple microservices implementing the database per service pattern. The API gateway performs API composition, providing query endpoints for two distinct types of front ends: web browsers and mobile clients.

## Testing the application

Requires `docker-compose`. Start the application with 

```
docker-compose up
```

After which you can access all the APIs. 

There is no authentication, so you can access them using a

- web browser or 
- any REST client (Postman, VSCode REST client).

## API gateway endpoints

These endpoints are meant to be exposed for the web browser and mobile clients

### Web browser API

The web browser API gives full product descriptions or review texts. Also the single product endpoints returns all reviews.

- **list all products**: http://localhost:4000/api/web/products
    - API composition: include number of reviews and average rating 
- **get one product**: http://localhost:4000/api/web/products/2
    - API composition: join full-sized product reviews

### Mobile application API

Mobile applicaitons want to minimize data transfers, so the API limits long product descriptions or review texts to 100 characters. The single product endpoint cointains the full product description, but only returns the first three reviews with truncated texts.

- **list all products** http://localhost:4000/api/mobile/products
    - API composition: include number of reviews and average rating
    - Product descriptions are truncated to 100 characters
- **get one product**: http://localhost:4000/api/mobile/products/2
    - API composition: join 3 product reviews ([this product](http://localhost:4000/api/mobile/products/4) has actually 4 reviews)
    - Review texts are truncated (see [this product](http://localhost:4000/api/mobile/products/1))


## Service API endpoints

These endpoints are only used internally, but this time they have been intentionally left open for anyone who wants to learn more about the application.

### Product service
- list all products: http://localhost:3000/api/products
- get one product: http://localhost:3000/api/products/2

### Review service
- list all reviews: http://localhost:3001/api/reviews
- get one review: http://localhost:3001/api/reviews/6
- get all reviews for the product: http://localhost:3001/api/reviews/product/3
