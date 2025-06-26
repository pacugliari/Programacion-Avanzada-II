const HttpError = require("../utils/http-error");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { isValidEmail, isValidPassword } = require("../utils/validators");

const register = async (req) => {
  const { email, password, confirmPassword, name } = req.body;

  // Validaciones
  if (!isValidEmail(email)) {
    throw new HttpError(400, "Email inválido").setErrors([
      { email: "El formato del email no es válido" },
    ]);
  }

  if (!isValidPassword(password)) {
    throw new HttpError(400, "Contraseña inválida").setErrors([
      { password: "Debe tener al menos 8 caracteres, una letra y un número" },
    ]);
  }

  if (!confirmPassword) {
    throw new HttpError(400, "Falta la confirmación de contraseña").setErrors([
      { confirmPassword: "Debe ingresar la confirmación de la contraseña" },
    ]);
  }

  if (password !== confirmPassword) {
    throw new HttpError(400, "Las contraseñas no coinciden").setErrors([
      { password: "Las contraseñas ingresadas deben ser iguales" }
    ]);
  }

  if (!name) {
    throw new HttpError(400, "Falta el nombre").setErrors([
      { name: "El campo nombre es requerido" },
    ]);
  }

  const exist = await User.findOne({ email });

  if (exist) {
    throw new HttpError(400, "Ya existe el usuario").setErrors([
      { email: "Este email ya está registrado" },
    ]);
  }

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashed, name });
};

const login = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new HttpError(400, "Email y contraseña son obligatorios").setErrors([
      ...(email ? [] : [{ email: "El email es requerido" }]),
      ...(password ? [] : [{ password: "La contraseña es requerida" }]),
    ]);
  }

  const { signToken } = await import("../utils/jwt.mjs");
  const user = await User.findOne({ email });

  const valid = user ? await bcrypt.compare(password, user.password) : false;

  if (!user || !valid) {
    throw new HttpError(400, "Credenciales inválidas").setErrors([
      { credentials: "Email o contraseña incorrectos" },
    ]);
  }

  const userResponse = { ...user.toObject() };
  delete userResponse.password;

  return {
    token: await signToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    }),
    user: {
      email: userResponse.email,
      role: userResponse.role,
      name: userResponse.name,
    },
  };
};

module.exports = {
  register,
  login,
};
