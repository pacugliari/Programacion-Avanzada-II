const { register, login, logout } = require("../../services/auth-session");

exports.loginForm = async (req, res) => {
  if (req.session?.user) {
    return res.redirect("/movies");
  }

  return res.render("auth/login", {
    title: "Iniciar Sesión",
  });
};

exports.registerForm = async (req, res) => {
  if (req.session?.user) {
    return res.redirect("/movies");
  }
  return res.render("auth/register", {
    title: "Registrarse",
  });
};

exports.register = async (req, res) => {
  await register(req);
  return res.status(201).render("auth/login", {
    title: "Iniciar Sesión",
    successMessage: "Registrado correctamente",
  });
};

exports.login = async (req, res) => {
  return await login(req, res);
};

exports.logout = async (req, res) => {
  return await logout(req, res);
};
