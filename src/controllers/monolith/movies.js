const { getactors } = require("../../services/actors");
const { getcategories } = require("../../services/categories");
const { getgenres } = require("../../services/genres");
const {
  getmovies,
  getPeliculaById,
  createPelicula,
  updatePelicula,
  deletePelicula,
} = require("../../services/movies");
const HttpError = require("../../utils/HttpError");

exports.index = async (req, res) => {
  let movies = await getmovies(req);
  res.render("movies/index", { movies, title: "Lista de peliculas" });
};

exports.detail = async (req, res) => {
  const pelicula = await getPeliculaById(req);

  if (!pelicula) {
    throw new HttpError(400, "El ID no corresponde a una pelicula registrada");
  }

  res.render("movies/detail", {
    movie: pelicula,
    title: "Detalle de pelicula",
  });
};

exports.createForm = async (req, res) => {
  let actors = [];
  let categories = [];
  let genres = [];

  actors = await getactors();
  categories = await getcategories();
  genres = await getgenres();
  res.render("movies/create", {
    title: "Crear pelicula",
    actors,
    genres,
    categories,
  });
};

exports.create = async (req, res) => {
  await createPelicula(req);

  res.status(201).render("movies/index", {
    movies: await getmovies(req),
    title: "Lista de películas",
    successMessage: "Película creada exitosamente",
  });
};

exports.delete = async (req, res) => {
  await deletePelicula(req);

  res.status(200).render("movies/index", {
    movies: await getmovies(req),
    title: "Lista de películas",
    successMessage: "Película borrada exitosamente",
  });
};
