const express = require("express");

const productsRouter = express.Router();

const {
  createNewProduct,
  getAllProducts,
  updateProductById,
  deleteProductById,
  getPageProducts,
  getProductByName,
  getProductsByType,
  getAllCategory,getProductGroubedBy
} = require("../controllers/products");

productsRouter.post("/", createNewProduct);
productsRouter.get("/", getAllProducts);
productsRouter.patch("/:id", updateProductById);
productsRouter.delete("/:id", deleteProductById);
productsRouter.get("/search", getPageProducts);
productsRouter.get("/search_1", getProductByName);
productsRouter.get("/search_2", getProductsByType);
productsRouter.get("/search_3", getAllCategory);
productsRouter.get("/group",getProductGroubedBy)
module.exports = productsRouter;
