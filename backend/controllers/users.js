const connection = require("../database/db");
const bcrypt = require("bcrypt");

//role_id FK cannot add or update it manulally in table user
const createNewUser = async (req, res) => {
  const { firstName, lastName, country, email, password, role_id, image } =
    req.body;

  const hashPassword = await bcrypt.hash(password, 5);

  const query = `INSERT INTO users (firstName, lastName,  country, email, password, role_id ,image) VALUES (?,?,?,?,?,?,?)`;

  const data = [firstName, lastName, country, email, hashPassword, 1, image];

  connection.query(query, data, (err, results) => {
    if (err) {
      if (err.sqlState == "23000") {
        return res.status(409).json({
          success: false,
          message: `The Email Already Exists`,
        });
      }
      return res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    } else {
      res.status(201).json({
        success: true,
        message: `The user has been created successfully`,
        results: results,
        data: data,
      });
    }
  });
};

//get all user //is_deleted=0 && put * ??
const getAllUser = (req, res) => {
  const query = `SELECT * FROM users where is_deleted=0 `;
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(409).json({
        success: false,
        massage: "somthing err when gettin user id",
        err: err,
      });
    }
    // result are the data returned by mysql server
    res.status(200).json({
      success: true,
      massage: "Success getting user id",
      results: results,
    });
  });
};

//get user by id  //??
const getUserById = (req, res) => {
  const userId = req.params.id;
  const query = `SELECT * FROM users WHERE id = ${userId}`;
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(409).json({
        success: false,
        massage: `somthing err when gettin user by id --> ${userId}`,
        err: err,
      });
    }
    // result are the data returned by mysql server
    res.status(200).json({
      success: true,
      massage: `Success getting user by id --> ${userId}`,
      results: results,
    });
  });
};

//update user information // role_id ,??
const updateInfo = async (req, res) => {
  const { firstName, lastName, country, email, password, image } = req.body;
  const hashPassword = await bcrypt.hash(password, 5);
  const id = req.params.id;
  const query = `UPDATE users SET firstName = ? , lastName = ? , country = ? , email = ? ,password = ?  ,image = ? WHERE id = ? `;
  const data = [firstName, lastName, country, email, hashPassword, image, id];
  connection.query(query, data, (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) {
      res.status(404).json({
        success: false,
        message: `The user: ${id} is not found`,
      });
    } else {
      res.status(202).json({
        success: true,
        message: `The information of user that id = ${id} is updated`,
        results: result,
        data: data,
      });
    }
  });
};

// delete user
const deleteUser = (req, res) => {
  const id = req.params.id;
  const query = `UPDATE users SET is_deleted=?  WHERE id=?`;
  const data = [1, req.params.id];
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

//update user role
const updateUserRole = (req, res) => {
  const id = req.params.id;
  const query = `UPDATE users SET role_id=?  WHERE id=?`;
  const data = [req.body.role_id, req.params.id];
  connection.query(query, data, (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) {
      res.status(404).json({
        success: false,
        message: `The user : ${id} is not found`,
      });
    } else {
      res.status(202).json({
        success: true,
        message: ` Succeeded to update user with id: ${id}`,
        results: result,
        id: id,
      });
    }
  });
};

module.exports = {
  createNewUser,
  getAllUser,
  getUserById,
  updateInfo,
  deleteUser,
  updateUserRole,
};
