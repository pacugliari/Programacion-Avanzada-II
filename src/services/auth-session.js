const HttpError = require("../utils/http-error");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { isValidEmail, isValidPassword } = require("../utils/validators");

const register = async (req) => {
  const { email, password, confirmPassword, name } = req.body;

  if (!isValidEmail(email)) {
    throw new HttpError(400, "Email inválido", "auth/register")
      .setErrors([{ email: "Debe ingresar un email válido" }]);
  }

  if (!name) {
    throw new HttpError(400, "El campo nombre es requerido", "auth/register")
      .setErrors([{ name: "El nombre es obligatorio" }]);
  }

  if (!isValidPassword(password)) {
    throw new HttpError(
      400,
      "Contraseña inválida",
      "auth/register"
    ).setErrors([{ password: "Debe tener al menos 8 caracteres, una letra y un número" }]);
  }

  if (password !== confirmPassword) {
    throw new HttpError(
      400,
      "Las contraseñas no coinciden",
      "auth/register"
    ).setErrors([
      { password: "Las contraseñas ingresadas deben ser iguales" }
    ]);
  }

  const exists = await User.findOne({ email });
  if (exists) {
    throw new HttpError(400, "Ya existe ese email", "auth/register")
      .setErrors([{ email: "Este email ya está registrado" }]);
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed, name });
  const userResponse = { ...user.toObject() };
  delete userResponse.password;
  return userResponse;
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const valid = user ? await bcrypt.compare(password, user.password) : false;

  if (!user || !valid) {
    throw new HttpError(400, "Credenciales inválidas", "auth/login")
      .setErrors([{ credentials: "Email o contraseña incorrectos" }]);
  }

  const userResponse = { ...user.toObject() };
  delete userResponse.password;

  req.session.save((err) => {
    if (err) {
      throw new HttpError(500, "No se pudo iniciar sesión", "auth/login")
        .setErrors([{ session: "Error al guardar sesión" }]);
    }
    req.session.user = userResponse;
    return res.redirect("movies/index");
  });
};

const logout = (req, res) => {
  if (!req.session) return;

  req.session.destroy((err) => {
    if (err) {
      throw new HttpError(500, "No se pudo cerrar sesión", "movies/index")
        .setErrors([{ session: "Error al destruir sesión" }]);
    }
    res.clearCookie("connect.sid");
    return res.redirect("auth/login");
  });
};

module.exports = {
  register,
  login,
  logout,
};
