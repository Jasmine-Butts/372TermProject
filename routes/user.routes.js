"use strict";
const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controllers");

router.get("/products/search", userController.searchProducts);
router.get("/products/category/:category", userController.getByCategory);
router.get("/products/name", userController.getProductDetailsByName);
router.put("/cart/update/:productId", userController.updateCartItem);
router.post("/cart/add", userController.addToCart);
router.delete("/cart/remove/:productId", userController.removeFromCart);
router.post("/cart/checkout", userController.checkoutCart);


module.exports = router;
