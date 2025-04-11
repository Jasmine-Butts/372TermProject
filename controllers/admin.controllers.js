"use strict";
const adminModel = require("../models/admin.models");

function getAll(req, res, next) {
  try {
    res.json(adminModel.getAll());
  } catch (err) {
    console.error("Error while getting products: ", err.message);
    next(err);
  }
}

function addProduct(req, res, next) {
  const newProduct = req.body;
  if (
    newProduct.name &&
    newProduct.imageUrl &&
    newProduct.description &&
    newProduct.price &&
    newProduct.details &&
    newProduct.categoryId
  ) {
    try {
      res.json(adminModel.addProduct(newProduct));
    } catch (err) {
      console.error("Error while adding product: ", err.message);
      next(err);
    }
  } else {
    res.status(400).send("Invalid Request");
  }
}

function updateProduct(req, res, next) {
  const id = req.params.id;
  const updatedProduct = req.body;
  if (
    updatedProduct.name &&
    updatedProduct.imageUrl &&
    updatedProduct.description &&
    updatedProduct.price &&
    updatedProduct.details &&
    updatedProduct.categoryId
  ) {
    try {
      res.json(adminModel.updateProduct(id, updatedProduct));
    } catch (err) {
      console.error("Error while updating product: ", err.message);
      next(err);
    }
  } else {
    res.status(400).send("Invalid Request");
  }
}
function bulkUploadProducts(req, res, next) {
  const products = req.body;
  if (Array.isArray(products) && products.length > 0) {
    try {
      res.json(adminModel.bulkUploadProducts(products));
    } catch (err) {
      console.error("Error while bulk uploading products: ", err.message);
      next(err);
    }
  } else {
    res.status(400).send("Invalid Request");
  }
}
function deleteProduct(req, res, next) {
  const id = req.params.id;
  if (id) {
    try {
      res.json(adminModel.deleteProduct(id));
    } catch (err) {
      console.error("Error while deleting product: ", err.message);
      next(err);
    }
  } else {
    res.status(400).send("Invalid Request");
  }
}

module.exports = {
  getAll,
  addProduct,
  updateProduct,
  bulkUploadProducts,
  deleteProduct,
};