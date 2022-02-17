const express = require("express");

const cartRouter = express.Router();

const {
  createCart,
  getAllCartOfUser,
  getAllOrder,
  updateCartById,
  deleteCartById,
  Add_wishList,
  getAllFavortListOfUser,
  deleteProductOfUserInFAvList,
  deleteAllCartOfUser,
  getAllHistoryCartOfUser,
} = require("../controllers/cart");
const authentication = require("../middleware/authentication");

cartRouter.post("/", authentication, createCart);
cartRouter.get("/:id", getAllCartOfUser);
cartRouter.get("/search/cart", getAllOrder);
cartRouter.put("/edit/:id/", updateCartById);
cartRouter.delete("/delete/:id/:product_id", deleteCartById);
cartRouter.post("/add_wishList", Add_wishList);
cartRouter.get("/FavortList/:id", getAllFavortListOfUser);
cartRouter.delete("/deleteFavortList/:id", deleteProductOfUserInFAvList);
cartRouter.delete("/deleteCart/:id", deleteAllCartOfUser);
cartRouter.get("/gethistory/:id", getAllHistoryCartOfUser);
module.exports = cartRouter;
