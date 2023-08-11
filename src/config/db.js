const mongoose = require("mongoose");
const logger = require("../config/logger");

let connectionAttempts = 0;

const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected"))
    .catch((err) => {
      console.error("Error trying to connect to database", err);
      connectionAttempts++;
      if (connectionAttempts < 5) {
        logger.info("Retrying connection...");
        setTimeout(connectDB, 5000);
      } else {
        logger.error("Connection failure. Exiting the app.");
        process.exit(1);
      }
    });
};

module.exports = connectDB;
