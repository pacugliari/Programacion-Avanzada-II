const {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  toggleBlockStatusMovie,
} = require("../../services/movies");
const ResponseBuilder = require("../../utils/api-response");

const getMoviesController = async (req, res) => {
  return res
    .status(200)
    .json(
      ResponseBuilder.success(
        await getMovies(req),
        "Lista de películas obtenida exitosamente"
      )
    );
};

const getMovieByIdController = async (req, res) => {
  return res
    .status(200)
    .json(
      ResponseBuilder.success(
        await getMovieById(req),
        "Película obtenida exitosamente"
      )
    );
};

const createMovieController = async (req, res) => {
  return res
    .status(201)
    .json(
      ResponseBuilder.success(
        await createMovie(req),
        "Película creada exitosamente",
        201
      )
    );
};

const updateMovieController = async (req, res) => {
  return res
    .status(200)
    .json(
      ResponseBuilder.success(
        await updateMovie(req),
        "Película actualizada exitosamente"
      )
    );
};

const deleteMovieController = async (req, res) => {
  await deleteMovie(req);
  return res
    .status(200)
    .json(ResponseBuilder.success(null, "Película eliminada exitosamente"));
};

const blockMovieController = async (req, res) => {
  const status = await toggleBlockStatusMovie(req);
  return res
    .status(200)
    .json(
      ResponseBuilder.success(
        null,
        `Película ${status} exitosamente`
      )
    );
};

module.exports = {
  getMoviesController,
  getMovieByIdController,
  createMovieController,
  updateMovieController,
  deleteMovieController,
  blockMovieController,
};
