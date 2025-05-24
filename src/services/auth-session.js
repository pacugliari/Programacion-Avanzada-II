const HttpError = require("../utils/http-error");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { isValidEmail, isValidPassword } = require("../utils/validators");

const register = async (req) => {
  const { email, password, confirmPassword, name } = req.body;

  if (!isValidEmail(email)) {
    throw new HttpError(400, "Email inválido", "auth/register");
  }

  if (!name) {
    throw new HttpError(400, "El campo nombre es requerido", "auth/register");
  }

  if (!isValidPassword(password)) {
    throw new HttpError(
      400,
      "La contraseña debe tener al menos 8 caracteres, una letra y un número",
      "auth/register"
    );
  }

  if (password !== confirmPassword) {
    throw new HttpError(
      400,
      "Las contraseñas ingresadas deben ser iguales",
      "auth/register"
    );
  }

  const exists = await User.findOne({ email });
  if (exists) throw new HttpError(400, "Ya existe ese email", "auth/register");

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed, name });
  const userResponse = { ...user.toObject() };
  delete userResponse.password;
  return userResponse;
};

const login = async (req,res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new HttpError(400, "Credenciales inválidas", "auth/login");
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new HttpError(400, "Credenciales inválidas", "auth/login");
  }

  const userResponse = { ...user.toObject() };
  delete userResponse.password;
  req.session.save((err) => {
    if (err) {
      throw new HttpError(500, "No se pudo iniciar sesión", "auth/login");
    }
    req.session.user = userResponse;
    res.redirect("movies/index");
  });
};

const logout = (req, res) => {
  if (!req.session) return;

  req.session.destroy((err) => {
    if (err) {
      throw new HttpError(500, "No se pudo cerrar sesión", "movies/index");
    }
    res.clearCookie("connect.sid");
    res.redirect("auth/login");
  });
};

module.exports = {
  register,
  login,
  logout,
};
