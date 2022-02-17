const connection = require("../database/db");

//creat new order in cart
const createCart = (req, res) => {
  const { quantity, product_id, user_id } = req.body;
  const query = `INSERT INTO cart (quantity , product_id , user_id ) VALUES (?,?,?)`;
  const data = [quantity, product_id, user_id];
  connection.query(query, data, (err, results) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
    res.status(201).json({
      success: true,
      message: " cart created",
      result: results,
      data: data,
    });
  });
};

// getAllCartOfUser
const getAllCartOfUser = (req, res) => {
  const userId = req.params.id;
  const query = `SELECT * FROM products INNER JOIN cart ON products.id = cart.product_id  WHERE cart.user_id = ? AND cart.is_deleted =?`;
  const data = [userId, 0];
  connection.query(query, data, (err, results) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
    console.log(results);
    res.status(201).json({
      success: true,
      message: "get cart success ",
      result: results,
    });
  });
};
//delete cart of user 
const deleteAllCartOfUser = (req, res) => {
const user_id = req.params.id;
const query = `UPDATE cart SET is_deleted =? WHERE  user_id=? `;
const data = [1, user_id];
connection.query(query,data, (err, results) => {
  if (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
  res.status(201).json({
    success: true,
    message: "delete cart success of user",
    result: results,
  });
});
}
// get history order of user 
const getAllHistoryCartOfUser = (req, res) => {
  const userId = req.params.id;
  const query = `SELECT * FROM products INNER JOIN cart ON products.id = cart.product_id  WHERE cart.user_id = ? AND cart.is_deleted =?`;
  const data = [userId, 1];
  connection.query(query, data, (err, results) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
    res.status(201).json({
      success: true,
      message: "get history cart success ",
      result: results,
    });
  });
};
//admin
const getAllOrder = (req, res) => {
  const query = `SELECT * FROM cart INNER JOIN products ON  cart.product_id = products.id INNER JOIN users ON cart.user_id = users.id`;
  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
    res.status(201).json({
      success: true,
      message: "get cart success admin",
      result: results,
    });
  });
};

// update cart by id for user
const updateCartById = (req, res) => {
  const id = req.params.id;
  const { quantity } = req.body;
  const user_id = req.body.user_id;
  const query = `UPDATE cart SET quantity=? WHERE  user_id=? AND id =?`;

  const data = [quantity, user_id, id];

  connection.query(query, data, (err, result) => {
    if (err) { throw err
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
    res.status(202).json({
      success: true,
      message: "update cart",
      result: result,
      data: data,
    });
  });
};

// delete quantity from cart by id for user
const deleteCartById = (req, res) => {
  const id = req.params.id;
  const product_id = req.params.product_id;

  const query = `UPDATE cart SET is_deleted=?  WHERE product_id=? AND user_id=? `;

  const data = [1, product_id, id];

  connection.query(query, data, (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) {
      res.status(404).json({
        success: false,
        message: `The cart : ${id} is not found`,
      });
    } else {
      res.status(202).json({
        success: true,
        message: ` Succeeded to delete cart with id: ${id}`,
        results: result,
        id: id,
      });
    }
  });
};
//Add wishlist
const Add_wishList = (req, res) => {
  const { product_id, user_id } = req.body;
  const query = `INSERT INTO favorite_list (product_id , user_id ) VALUES (?,?)`;
  const data = [product_id, user_id];
  connection.query(query, data, (err, results) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
    res.status(201).json({
      success: true,
      message: "favorite_list created",
      result: results,
      data: data,
    });
  });
};
// get favorete list
const getAllFavortListOfUser = (req, res) => {
  const userId = req.params.id;
  const query = `SELECT * FROM products INNER JOIN favorite_list ON favorite_list.product_id=products.id AND favorite_list.user_id = ? AND favorite_list.is_deleted =?  `;
  const data = [userId, 0];
  connection.query(query, data, (err, results) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
    res.status(201).json({
      success: true,
      message: "get favorite_list success ",
      result: results,
    });
  });
};
//delete product in fav-list 
const deleteProductOfUserInFAvList = (req, res) => {
  const id = req.params.id;
  const query = `UPDATE favorite_list SET is_deleted=? WHERE  id =?`;
  const data = [1,id];
  connection.query(query, data, (err, results) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
    res.status(201).json({
      success: true,
      message: "delete product from  favorite_list success ",
      result: results,
      data : data
    });
  });
};
module.exports = {
  createCart,
  getAllCartOfUser,
  getAllOrder,
  updateCartById,
  deleteCartById,
  Add_wishList,
  getAllFavortListOfUser,
  deleteProductOfUserInFAvList,
  deleteAllCartOfUser,
  getAllHistoryCartOfUser
};
