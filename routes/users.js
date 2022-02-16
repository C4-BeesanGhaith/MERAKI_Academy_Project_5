const express = require("express");

const userRouter = express.Router();

const {
  createNewUser,
  getAllUser,
  getUserById,
  updateInfo,
  deleteUser,
  updateUserRole,
} = require("../controllers/users");

userRouter.post("/", createNewUser);
userRouter.get("/", getAllUser);
userRouter.get("/:id", getUserById);
userRouter.patch("/update/:id", updateInfo);
userRouter.delete("/:id", deleteUser);
userRouter.put("/role/:id", updateUserRole);

module.exports = userRouter;
