# Lux Haven REST API

The Basic REST API using Node + Express JS to manage a mock jewelry store with product browsing and cart features.

## Installation
- Get the project
    - clone

        `git clone `
    - download zip.
- Open the project in VSCode.
- Open a Terminal.
- Install required packages.
    - `npm install`
- Start the server
    - `nodemon server.js`
 
## API Endpoints
Use Thunder Client to try the following endpoints

---

## Get all products
  ## Request - GET /products

      https://localhost:3000/products

  ## Response
    [
      {
        "productId": 1,
        "name": "Dia Knot Ring",
        "imageUrl": "/images/ring.jpg",
        "description": "Dia Knot is an expression of unwavering bonds.",
        "price": 75,
        "details": "18k gold with round brilliant diamonds. Carat weight: 0.25.",
        "categoryId": 4
      },
      {
        "productId": 2,
        "name": "Leaf Ring",
        "imageUrl": "/images/ring3.jpg",
        "description": "The Leaf Ring features a delicate leaf band design.",
        "price": 55.5,
        "details": "18k yellow gold.",
        "categoryId": 4
      }
    ]


---

## Get a product by Category
  ## Request - GET /category/{categoryId}/products
      https://localhost:3000/category/4/products

---

## Search for products
  ## Request - GET /search?q=leaf
    
---

## Add product to the cart
 ## Request - POST /cart
     https://localhost:3000/cart

  ## Body (JSON)
    {
      "productId": 2,
      "name": "Leaf Ring",
      "imageUrl": "/images/ring3.jpg",
      "description": "The Leaf Ring features a delicate leaf band design.",
      "price": 55.5,
      "details": "18k yellow gold.",
      "categoryId": 4,
      "quantity": 1
    }

  ## Reponse
    {
     "message": "Item added to cart",
      "cart": [
        {
          "productId": 2,
          "quantity": 1
        }
      ] 
    }
---

## View Cart
  ## Request - GET /cart
    http://localhost:3000/cart

---

## Remove Product from Cart
  ## Request - DELETE /cart/{productId}
      http://localhost:3000/cart/2
---

## Checkout Cart
  ## Request - POST /cart/checkout
      http://localhost:3000/cart/checkout

### Response
    {
      "message": "Checkout complete, cart is now empty."
    }










  
