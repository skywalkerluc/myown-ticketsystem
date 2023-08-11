const bcrypt = require("bcryptjs");
const User = require("../models/user");
const logger = require("../config/logger");

const register = async (req, res, next) => {
  const { email, password, firstName, lastName, phoneNumber, address } =
    req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber,
      address,
    });
    await user.save();

    res.status(201).json({ message: "Usuário registrado com sucesso!", user });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    logger.error("Erro ao buscar usuários:", error);
    res.status(500).json({ message: "Erro interno" });
  }
};

module.exports = { register, getAll };
