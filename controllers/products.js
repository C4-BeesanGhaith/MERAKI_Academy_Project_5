const connection = require("../database/db");

//create new products

const createNewProduct = (req, res) => {
  const { image, nameProduct, description, price, type } = req.body;

  const query = `INSERT INTO products (image,nameProduct,description,price,type) VALUES (?,?,?,?,?)`;
  const data = [image, nameProduct, description, price, type];

  connection.query(query, data, (err, results) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
    res.status(201).json({
      success: true,
      message: " product created",
      result: results,
      data: data,
    });
  });
};

//get all products
const getAllProducts = (req, res) => {
  const query = `SELECT * FROM products WHERE is_deleted=0`;
  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "server error",
      });
    }
    res
      .status(200)
      .json({ success: true, message: "all productss", result: results });
  });
};

//update product by id
const updateProductById = (req, res) => {
  const { image, nameProduct, description, price, type } = req.body;
  const id = req.params.id;

  const query = `UPDATE products SET image=?,nameProduct=?,description=?,price=?,type=?  WHERE id=?`;
  const data = [image, nameProduct, description, price, type, id];
  connection.query(query, data, (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) {
      res.status(404).json({
        success: false,
        message: `The product: ${_id} is not found`,
      });
    } else {
      res.status(202).json({
        success: true,
        message: `product updated`,
        results: result,
        data: data,
      });
    }
  });
};

//delete product by id
const deleteProductById = (req, res) => {
  const id = req.params.id;
  const query = `UPDATE products SET is_deleted=?  WHERE id=?`;
  const data = [1, id];
  connection.query(query, data, (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) {
      res.status(404).json({
        success: false,
        message: `The Product : ${id} is not found`,
      });
    } else {
      res.status(202).json({
        success: true,
        message: ` Succeeded to delete product with id: ${id}`,
        results: result,
        id: id,
      });
    }
  });
};

// get page products //pagination
const getPageProducts = (req, res) => {
  // limit as 8
  const limit = 8;
  // page number
  const page = req.query.page;
  const offset = (page - 1) * limit;
  const query = "select * from Products limit " + limit + " OFFSET " + offset;

  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "server error",
      });
    }
    res.status(200).json({
      success: true,
      message: `page ${page} productss`,
      result: results,
    });
  });
};

// get product by name //search //products
const getProductByName = async (req, res) => {
  const name = req.query.name;
  const query = `SELECT * FROM products WHERE nameProduct REGEXP '^${name}'`;

  const data = [name];
  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "server error",
      });
    }
    res
      .status(200)
      .json({ success: true, message: ` product by name`, result: results });
  });
};

//get products by type //category  //type
const getProductsByType = (req, res) => {
  const type = req.query.type;
  const query = `SELECT * FROM products WHERE is_deleted=0 AND type=?`;
  const data = [type];
  connection.query(query, data, (err, results) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "server error",
      });
    }
    res
      .status(200)
      .json({ success: true, message: ` product by type`, result: results });
  });
};
//getAllCategory
const getAllCategory = (req, res) => {
  const query = `SELECT type FROM products WHERE is_deleted=0 `;

  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "server error",
      });
    }
    res
      .status(200)
      .json({ success: true, message: ` all type`, result: results });
  });
};

const getProductGroubedBy = (req,res) => {
  const query = `SELECT * FROM products GROUP BY type   `;
  connection.query(query, (err, results) => {
    if (err) { throw err
      res.status(500).json({
        success: false,
        message: "server error",
      });
    }
    res.status(200).json({ success: true, message: ` all type`, result: results });
  });
};

module.exports = {
  createNewProduct,
  getAllProducts,
  updateProductById,
  deleteProductById,
  getPageProducts,
  getProductByName,
  getProductsByType,
  getAllCategory,
  getProductGroubedBy,
};
