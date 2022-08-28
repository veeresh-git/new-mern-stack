const productModal = require("../models/productModal");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorhandler");
// const CatchAsyncerrors = require("../middelware/catchAsyncErrors");

// Create product
exports.addNewProduct = (req, res, next) => {
  try {
    productModal
      .create(req.body)
      .then((product) => {
        res.status(200).json({ success: true, product });
      })
      .catch((err) => next(err));
  } catch (err) {
    next(err);
  }
};

// Get all products
exports.getAllProducts = (req, res, next) => {
  try {
    const getProducts = new ApiFeatures(productModal, req.query || "");
    getProducts
      .search()
      .filter()
      .pagination(5)
      .query.then((products) => {
        res.status(200).json({ success: true, products });
      })
      .catch((err) => next(err));
  } catch (err) {
    next(err);
  }
};

// Get product
exports.getSingleProduct = async (req, res, next) => {
  try {
    const porduct = await productModal.findById(req.params.id);
    if (!porduct) {
      next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({ success: true, porduct });
  } catch (err) {
    next(err);
  }
};

// Update product - Admin
exports.updateProduct = async (req, res, next) => {
  try {
    const porduct = await productModal.findById(req.params.id);
    if (!porduct) {
      next(new ErrorHandler("Product not found", 404));
    }
    productModal
      .findByIdAndUpdate(req.params.id, req.body)
      .then((product) => {
        res.status(200).json({ success: true, product });
      })
      .catch((err) => next(err));
  } catch (err) {
    next(err);
  }
};

// Delete product - Admin
exports.deleteProduct = async (req, res, next) => {
  try {
    const porduct = await productModal.findById(req.params.id);
    if (!porduct) {
      res.status(500).json({ message: "Product not found." });
    }
    porduct
      .remove()
      .then((product) => {
        res.status(200).json({ success: true, product });
      })
      .catch((err) => next(err));
  } catch (err) {
    next(err);
  }
};
