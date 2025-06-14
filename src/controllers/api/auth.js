const { register, login } = require("../../services/auth-jwt");

const registerController = async (req, res) => {
  res.status(200).json({ payload: await register(req) });
};

const loginController = async (req, res) => {
  res.status(200).json({ payload: await login(req) });
};

module.exports = {
  registerController,
  loginController,
};
