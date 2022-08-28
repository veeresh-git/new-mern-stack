const mongoose = require("mongoose");

const handleConnect = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    })
    .then((data) => {
      console.log("data base connected ");
    });
};

module.exports = handleConnect;
