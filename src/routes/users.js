const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const admin = require("../middlewares/auth");

router.get("/users", admin, userController.getAll);

router.post("/login", authController.login);

router.post("/register", userController.register);

module.exports = router;
