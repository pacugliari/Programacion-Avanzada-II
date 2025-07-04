const { getMovies } = require("../services/movies");
const cloudinary = require("../config/cloudinary");
const ResponseBuilder = require("../utils/api-response");

const errorHandler = async (err, req, res, next) => {
  const statusCode = err.statusCode ?? 500;
  const errors = err.errors ?? [];
  const urlNavigation = err.urlNavigation ?? "movies/index";
  const title = err.title ?? "Lista de películas";
  const message =
    err.message ?? "Se ha generado un error inesperado en el servidor.";

  if (req.file && req.file.filename) {
    try {
      await cloudinary.uploader.destroy(req.file.filename);
    } catch (error) {
      console.error("Error borrando imagen en Cloudinary:", error);
    }
  }

  if (req.originalUrl.startsWith("/api")) {
    return res
      .status(statusCode)
      .json(ResponseBuilder.error(message, errors, statusCode));
  }

  res.status(statusCode).render(urlNavigation, {
    movies: await getMovies(req),
    title: title,
    errorMessage: message,
    errorCode: statusCode,
  });
};

module.exports = errorHandler;
