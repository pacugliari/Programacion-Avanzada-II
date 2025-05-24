const { register, login } = require("../../services/auth-jwt");

const registerController = async (req, res) => {
  res.status(200).json({ payload: { token: await register(req) } });
};

const loginController = async (req, res) => {
  res.status(200).json({ payload: { token: await login(req) } });
};

module.exports = {
  registerController,
  loginController,
};
