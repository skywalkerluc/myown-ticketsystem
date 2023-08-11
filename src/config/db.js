const mongoose = require("mongoose");
const logger = require("../config/logger");

let connectionAttempts = 0;

const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Conectado ao banco de dados"))
    .catch((err) => {
      console.error("Erro ao conectar ao banco de dados", err);
      connectionAttempts++;
      if (connectionAttempts < 5) {
        logger.info("Tentando reconectar...");
        setTimeout(connectDB, 5000); // Tenta reconectar em 5 segundos
      } else {
        logger.error("Falha ao reconectar. Encerrando o aplicativo.");
        process.exit(1);
      }
    });
};

module.exports = connectDB;
