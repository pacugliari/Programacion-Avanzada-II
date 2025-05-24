const fs = require("fs");
const { getMovies } = require("../services/movies");

const errorHandler = async (err, req, res, next) => {
  const statusCode = err.statusCode ?? 500;
  const urlNavigation = err.urlNavigation;
  const title = err.title ?? "Lista de películas";
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
  
  res.status(statusCode).render(urlNavigation, {
    movies: await getMovies(req),
    title: title,
    errorMessage: message,
    errorCode: statusCode,
  });
};

module.exports = errorHandler;
