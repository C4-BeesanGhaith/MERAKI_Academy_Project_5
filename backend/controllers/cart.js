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
  //   const query = `SELECT image,nameProduct,price FROM product LEFT JOIN cart ON product.id = cart.product_id`;
  // console.log(req.params.id);
  const userId = req.params.id;
  const query = `SELECT * FROM cart INNER JOIN products ON products.id = cart.product_id  WHERE cart.user_id = ?`;
  const data = [userId];
  connection.query(query, data, (err, results) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
    res.status(201).json({
      success: true,
      message: "get cart success ",
      result: results,
    });
  });
};
//admin
const getAllOrder = (req, res) => {
  const query = `SELECT * FROM cart LEFT JOIN products ON  cart.product_id = products.id INNER JOIN users ON cart.user_id = users.id `;
  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
    res.status(201).json({
      success: true,
      message: "get cart success ",
      result: results,
    });
  });
};

// update cart by id for user
const updateCartById = (req, res) => {
  const id = req.params.id;
  const product_id = req.params.product_id;
  const { quantity } = req.body;

  const query = `UPDATE cart SET quantity=? WHERE product_id=? AND user_id=?`;

  const data = [quantity, product_id, id];

  connection.query(query, data, (err, result) => {
    if (err) {
      console.log(quantity, id, product_id);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
    res.status(202).json({
      success: true,
      message: "update cart",
      result: result,
      data: data
    });
  });
};

module.exports = {
  createCart,
  getAllCartOfUser,
  getAllOrder,
  updateCartById,
};
