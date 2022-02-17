const express = require("express");

const { Createpermission } = require("../controllers/permission");

const permissionRouter = express.Router();

permissionRouter.post("/", Createpermission);

module.exports = permissionRouter;
