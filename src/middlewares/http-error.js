const fs = require("fs");
const { getMovies } = require("../services/movies");

const errorHandler = async (err, req, res, next) => {
  const statusCode = err.statusCode ?? 500;
  const title = err.title ?? "Error";
  const message =
    err.message ?? "Se ha generado un error inesperado en el servidor.";

  if (req.originalUrl.startsWith("/api")) {
    return res.status(statusCode).json({
      error: true,
      message,
    });
  }

  if (req.file && req.file.path) {
    fs.unlink(req.file.path, () => {});
  }

  res.status(statusCode).render("movies/index", {
    movies: await getMovies(req),
    title: "Lista de películas",
    errorMessage: message,
    errorCode: statusCode,
  });
};

module.exports = errorHandler;
