const {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  toggleBlockStatusMovie,
} = require("../../services/movies");

const getMoviesController = async (req, res) => {
  return res.status(200).json({ payload: await getMovies(req) });
};

const getMovieByIdController = async (req, res) => {
  return res.status(200).json({ payload: await getMovieById(req) });
};

const createMovieController = async (req, res) => {
  return res
    .status(201)
    .json({ message: "Película creada", payload: await createMovie(req) });
};

const updateMovieController = async (req, res) => {
  return res.status(200).json({
    message: "Película actualizada",
    payload: await updateMovie(req),
  });
};

const deleteMovieController = async (req, res) => {
  await deleteMovie(req);
  return res.status(200).json({ message: "Pelicula eliminada" });
};

const blockMovieController = async (req, res) => {
  const status = await toggleBlockStatusMovie(req);
  return res.status(200).json({ message: `Película ${status} exitosamente` });
};

module.exports = {
  getMoviesController,
  getMovieByIdController,
  createMovieController,
  updateMovieController,
  deleteMovieController,
  blockMovieController,
};
