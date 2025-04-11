"use strict";

function getAll() {
  const sql = `SELECT * 
              FROM Products;`;
  console.log("SQL:", sql);
  const data = db.all(sql);
  return data;
}
  
function addProduct(newProduct) {
  const sql = `INSERT INTO Products (name, imageUrl, description, price, details, categoryId) 
              VALUES (?, ?, ?, ?, ?, ?);`;
  console.log("SQL:", sql);
  const params = [
    newProduct.name,
    newProduct.imageUrl,
    newProduct.description,
    newProduct.price,
    newProduct.details,
    newProduct.categoryId,
  ];
  const info = db.run(sql, params);
  return info;
}

function updateProduct(id, updatedProduct) {
  const sql = `UPDATE Products 
              SET name = ?, imageUrl = ?, description = ?, price = ?, details = ?, categoryId = ? 
              WHERE productId = ?;`;
  console.log("SQL:", sql);
  const params = [
    updatedProduct.name,
    updatedProduct.imageUrl,
    updatedProduct.description,
    updatedProduct.price,
    updatedProduct.details,
    updatedProduct.categoryId,
    id,
  ];
  const info = db.run(sql, params);
  return info;
}

function bulkUploadProducts(products) {
  const sql = `INSERT INTO Products (name, imageUrl, description, price, details, categoryId) 
              VALUES (?, ?, ?, ?, ?, ?);`;
  console.log("SQL:", sql);
  const params = products.map(product => [
    product.name,
    product.imageUrl,
    product.description,
    product.price,
    product.details,
    product.categoryId,
  ]);
  const info = db.run(sql, params);
  return info;
}

function deleteProduct(id) {
  const sql = `DELETE FROM Products 
              WHERE productId = ?;`;
  console.log("SQL:", sql);
  const params = [id];
  const info = db.run(sql, params);
  return info;
}

module.exports = {
  getAll,
  addProduct,
  updateProduct,
  bulkUploadProducts,
  deleteProduct,
};
