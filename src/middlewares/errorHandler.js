const logger = require("../config/logger");

const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: "Acesso não autorizado" });
  }
  logger.error(err);
  res.status(500).json({ message: "Erro interno" });
};

module.exports = errorHandler;
