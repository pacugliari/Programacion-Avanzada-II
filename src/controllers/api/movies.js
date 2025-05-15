const {
  getmovies,
  getPeliculaById,
  createPelicula,
  updatePelicula,
  deletePelicula,
} = require("../../services/movies");

const getmoviesController = async (req, res) => {
  let movies = await getmovies(req);
  res.status(200).json({ payload: movies });
};

const getPeliculaByIdController = async (req, res) => {
  const pelicula = await getPeliculaById(req);

  res.status(200).json({ payload: pelicula });
};

const createPeliculaController = async (req, res) => {
  const pelicula = await createPelicula(req);
  res.status(201).json({ message: "Película creada", payload: pelicula });
};

const updatePeliculaController = async (req, res) => {
  const updated = await updatePelicula(req);

  res.status(200).json({
    message: "Película actualizada",
    payload: updated,
  });
};

const deletePeliculaController = async (req, res) => {
  await deletePelicula(pelicula);
  res.status(200).json({ message: "Pelicula eliminada" });
};

module.exports = {
  getmoviesController,
  getPeliculaByIdController,
  createPeliculaController,
  updatePeliculaController,
  deletePeliculaController,
};
