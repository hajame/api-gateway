# API gateway
An experimental [API gateway](https://microservices.io/patterns/apigateway.html) for two simple microservices implementing the database per service pattern. The API gateway performs API composition, providing query endpoints for two distinct types of front ends: web browsers and mobile clients.

## Testing the application

Requires `docker-compose`. Start the application with 

```
docker-compose up
```

## Service API endpoints

- list all products: `GET localhost:3000/api/products`
- list all reviews: `GET localhost:3001/api/reviews`



