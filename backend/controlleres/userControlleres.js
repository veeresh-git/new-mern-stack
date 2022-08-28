const bcrypt = require("bcryptjs");
const userModal = require("../models/userModal");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorhandler");
const sendToken = require("../utils/setToken");

// Create User
exports.createUser = async (req, res, next) => {
  const encryptedPass = await bcrypt.hash(req.body.password, 10);
  try {
    userModal
      .create({
        ...req.body,
        password: encryptedPass,
        avatar: {
          public_id: "sample id",
          url: "sample image url",
        },
      })
      .then((user) => {
        sendToken(user, 200, res);
      })
      .catch((err) => next(err));
  } catch (err) {
    next(err);
  }
};

// Login
exports.logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModal.findOne({ email }).select("+password");
    if (!email || !password) {
      return next(
        new ErrorHandler("Username and password are required field", 400)
      );
    }
    if (!user) {
      return next(new ErrorHandler("Invalid user or password", 400));
    }
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid user or password", 400));
    }

    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};
