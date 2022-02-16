const connection = require("../database/db");

const Createpermission = (req, res) => {
  const { permission } = req.body;
  const query = `INSERT INTO permission (permission) VALUES (?)`;
  const data = [permission];
  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(409).json({
        success: false,
        massage: "somthing err",
        err: err,
      });
    }
    // result are the data returned by mysql server
    res.status(200).json({
      success: true,
      massage: "Success permission Added",
      results: results,
      data: data,
    });
  });
};

module.exports = {
  Createpermission,
};
