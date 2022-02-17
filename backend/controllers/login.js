const connection = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// This function checks user login credentials
const login = async (req, res) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();

  const query = `SELECT * FROM users  WHERE email = ? AND is_deleted=0`;

  const data = [email];

  connection.query(query, data, (err, result) => {
    if (err) throw err;

    if (result.length) {
      bcrypt.compare(password, result[0].password, (err, response) => {
        if (err) throw err;

        if (response) {
          const payload = {
            userId: result[0].id,
            firstName: result[0].firstName,
            lastName: result[0].lastName,
            country: result[0].country,
            email: result[0].email,
            image: result[0].image,
            role: result[0].role_id,
          };

          const secret = process.env.SECRET;

          const options = {
            expiresIn: "60m",
          };

          const token = jwt.sign(payload, secret, options);
          res.status(200).json({
            success: true,
            message: `Valid login credentials`,
            token: token,
            payload: payload,
          });
        } else {
          return res.status(403).json({
            success: false,
            message: `The password you’ve entered is incorrect`,
          });
        }
      });
    } else {
      return res.status(404).json({
        success: false,
        message: `The Email Doesn't Exist`,
      });
    }
  });
};

module.exports = {
  login,
};
