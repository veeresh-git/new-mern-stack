const express = require("express");
const {
  getAllProducts,
  addNewProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} = require("../controlleres/productControlleres");

const routes = express.Router();

routes.route("/product").get(getAllProducts);

routes.route("/product/new").post(addNewProduct);

routes.route("/product/:id").put(updateProduct);

routes.route("/product/:id").get(getSingleProduct);

routes.route("/product/:id").delete(deleteProduct);

module.exports = routes;
