"use strict";
const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin.controllers");

router.get("/products/all", adminController.getAll);
router.post("/admin/products", adminController.addProduct);
router.put("/admin/products/:id", adminController.updateProduct);
router.post("/admin/products/bulk-upload", adminController.bulkUploadProducts);
router.delete("/admin/products/:id", adminController.deleteProduct);

module.exports = router;
