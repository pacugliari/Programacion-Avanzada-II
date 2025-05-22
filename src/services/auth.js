const HttpError = require("../utils/http-error");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const isValidPassword = (password) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return regex.test(password);
};

const register = async (req) => {
  const { email, password } = req.body;

  // Validaciones
  if (!isValidEmail(email)) {
    throw new HttpError(400, "Email inválido");
  }

  if (!isValidPassword(password)) {
    throw new HttpError(
      400,
      "La contraseña debe tener al menos 8 caracteres, una letra y un número"
    );
  }

  const { signToken } = await import("../utils/jwt.mjs");
  const exist = await User.findOne({ email });
  if (exist) throw new HttpError(400, "Ya existe el usuario");

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed });

  return await signToken({
    id: user._id.toString(),
    email: user.email,
    role: user.role,
  });
};

const login = async (req) => {
  const { email, password } = req.body;
  if (!email || !password) throw new HttpError(400, "Email y contraseña son obligatorios");

  const { signToken } = await import("../utils/jwt.mjs");
  const user = await User.findOne({ email });
  if (!user) throw new HttpError(400, "Credenciales inválidas");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new HttpError(400, "Credenciales inválidas");

  return await signToken({
    id: user._id.toString(),
    email: user.email,
    role: user.role,
  });
};

module.exports = {
  register,
  login,
};
