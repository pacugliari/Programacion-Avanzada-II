const { register, login, logout } = require("../../services/auth-session");

exports.loginForm = async (req, res) => {
  res.render("auth/login", {
    title: "Iniciar Sesión",
  });
};

exports.registerForm = async (req, res) => {
  res.render("auth/register", {
    title: "Registrarse",
  });
};

exports.register = async (req, res) => {
  await register(req);
  res.status(201).render("auth/login", {
    title: "Iniciar Sesión",
    successMessage: "Registrado correctamente",
  });
};

exports.login = async (req, res) => {
  req.session.user = await login(req);
  res.redirect("/movies");
};

exports.logout = async (req, res) => {
  logout(req,res);
};
