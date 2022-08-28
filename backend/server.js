const app = require("./app");

const dotEnv = require("dotenv");
const bodyParser = require("body-parser");

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const databaseConnect = require("./config/database");
const errorHandler = require("./middelware/error");

dotEnv.config({ path: "backend/config/config.env" });

databaseConnect();

process.on("uncaughtException", (err) => {
  console.log("Shutting down the server..!");
  process.exit(1);
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/api/v1", productRoutes);
app.use("/api/v1", userRoutes);

// custom error handling middleware
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("server started at " + process.env.PORT);
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log("Shutting down the server..!");
  process.exit(1);
});
