const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authentication failed" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.userData = decoded;
  next();
}

function admin(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authentication failed" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded.role !== "admin") {
    return res.status(403).json({ message: "Denied: admin only allowed" });
  }

  req.userData = decoded;
  next();
}

module.exports = { authenticate, admin };
