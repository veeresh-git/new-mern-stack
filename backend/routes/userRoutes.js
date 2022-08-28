const express = require("express");
const { createUser, logIn } = require("../controlleres/userControlleres");

const routes = express.Router();

routes.route("/user/create").post(createUser);
routes.route("/user/login").post(logIn);

module.exports = routes;
