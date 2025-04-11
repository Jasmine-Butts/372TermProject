"use strict";

function searchProducts(query) {
    const sql = `SELECT * 
                FROM Products 
                WHERE name LIKE ?;`;
    console.log("SQL:", sql);
    const data = db.all(sql, [`%${query}%`]);
    return data;
  } 

function getByCategory(category) {
    const sql = `SELECT * 
                FROM Products p 
                JOIN Categories c 
                ON p.categoryId = c.categoryId 
                WHERE c.name = ?;`;
    console.log("SQL:", sql);
    const data = db.all(sql, [category]);
    return data;
  }
  
  function getProductDetailsByName(name) {
    const sql = `SELECT * 
                FROM Products 
                WHERE name = ?;`;
    console.log("SQL:", sql);
    const productDetails = db.get(sql, [name]);
    return productDetails;
  }

  function addToCart(cartId, productId, quantity) {
    const sql = `INSERT INTO CartItems (cartId, productId, quantity) 
                VALUES (?, ?, ?);`;
    console.log("SQL:", sql);
    const params = [cartId, productId, quantity];
    const info = db.run(sql, params);
    return info;
  }
  
  function updateCartItem(cartId, productId, quantity) {
    const sql = `UPDATE CartItems 
                SET quantity = ? 
                WHERE cartId = ? AND productId = ?;`;
    console.log("SQL:", sql);
    const params = [quantity, cartId, productId];
    const info = db.run(sql, params);
    return info;
  }
  
  function removeFromCart(cartId, productId) {
    const sql = `DELETE FROM CartItems 
                WHERE cartId = ? AND productId = ?;`;
    console.log("SQL:", sql);
    const params = [cartId, productId];
    const info = db.run(sql, params);
    return info;
}

function checkoutCart() {
  const deleteSql = `DELETE FROM CartItems WHERE cartId = ?;`;
  const updateSql = `UPDATE Carts SET status = 'purchased' WHERE cartId = ?;`;

  try {
    const deleteInfo = db.run(deleteSql, [cartId]);
    const updateInfo = db.run(updateSql, [cartId]);
    return {
      success: true,
      message: `Cart ${cartId} checked out successfully.`,
      deletedItems: deleteInfo.changes,
      updatedCart: updateInfo.changes
    };
  } catch (error) {
    console.error("Error during checkout:", error.message);
    return {
      success: false,
      message: "Checkout failed.",
      error: error.message
    };
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