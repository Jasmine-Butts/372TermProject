"use strict";
const userModel = require("../models/user.models");
  
function searchProducts(req, res, next) {
  const query = req.query.q;
  if (query) {
    try {
      res.json(userModel.search(query));
    } catch (err) {
      console.error("Error while searching products: ", err.message);
      next(err);
    }
  } else {
    res.status(400).send("Search query is required");
  }
}
  
function getByCategory(req, res, next) {
  const category = req.params.category;
  try {
    res.json(userModel.getByCategory(category));
  } catch (err) {
    console.error("Error while getting products by category: ", err.message);
    next(err);
  }
}
  
function getProductDetailsByName(req, res, next) {
  const name = req.params.name;
  try {
    const product = userModel.getByName(name);
    if (product) {
      res.json(product);
    } else {
      res.status(404).send("Product not found");
    }
  } catch (err) {
    console.error("Error while getting product details by name: ", err.message);
    next(err);
  }
}

function addToCart(req, res, next) {
  const productId = req.body.productId;
  const quantity = req.body.quantity ? parseInt(req.body.quantity) : 1;
  if (productId) {
    try {
      if (cartModel.addItem(productId, quantity)) {
        res.status(201).send("Product added to cart.");
      } else {
        res.status(404).send("Product not found.");
      }
    } catch (err) {
      console.error("Error while adding to cart: ", err.message);
      next(err);
    }
  } else {
    res.status(400).send("Missing productId in the request body.");
  }
}
  
function updateCartItem(req, res, next) {
  const productId = req.params.productId;
  const quantity = req.body.quantity ? parseInt(req.body.quantity) : 1;
  if (productId) {
    try {
      if (userModel.updateCartItem(productId, quantity)) {
        res.status(204).send();
      } else {
        res.status(404).send("Product not found in cart.");
      }
    } catch (err) {
      console.error("Error while updating cart item: ", err.message);
      next(err);
    }
  } else {
    res.status(400).send("Missing productId in the request.");
  }
}

function removeFromCart(req, res, next) {
  const productId = req.params.productId;
  if (productId) {
    try {
      if (cartModel.removeItem(productId)) {
        res.status(204).send();
      } else {
        res.status(404).send("Product not found in cart.");
      }
    } catch (err) {
      console.error("Error while removing from cart: ", err.message);
      next(err);
    }
  } else {
    res.status(400).send("Missing productId in the request.");
  }
}
  
function checkoutCart(req, res, next) {
  try {
    if (cartModel.checkout()) {
      res.status(200).send("Checkout successful.");
    } else {
      res.status(400).send("Checkout failed.");
    }
  } catch (err) {
    console.error("Error during checkout: ", err.message);
    next(err);
  }
}

module.exports = {
  searchProducts,
  getByCategory,
  getProductDetailsByName,
  addToCart,
  updateCartItem,
  removeFromCart,
  checkoutCart,
};