const { getActors } = require("../../services/actors");
const { getCategories } = require("../../services/categories");
const { getGenres } = require("../../services/genres");
const {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../../services/movies");

exports.index = async (req, res) => {
  res.render("movies/index", {
    movies: await getMovies(req),
    title: "Lista de peliculas",
  });
};

exports.detail = async (req, res) => {
  res.render("movies/detail", {
    movie: await getMovieById(req),
    title: "Detalle de pelicula",
  });
};

exports.createForm = async (req, res) => {
  res.render("movies/create", {
    title: "Crear pelicula",
    actors: await getActors(),
    genres: await getGenres(),
    categories: await getCategories(),
  });
};

exports.editForm = async (req, res) => {
  res.render("movies/edit", {
    title: "Editar pelicula",
    actors: await getActors(),
    genres: await getGenres(),
    categories: await getCategories(),
    movie: await getMovieById(req),
  });
};

exports.create = async (req, res) => {
  await createMovie(req);

  res.status(201).render("movies/index", {
    movies: await getMovies(req),
    title: "Lista de películas",
    successMessage: "Película creada exitosamente",
  });
};

exports.edit = async (req, res) => {
  await updateMovie(req);

  res.status(201).render("movies/index", {
    movies: await getMovies(req),
    title: "Lista de películas",
    successMessage: "Película modificada exitosamente",
  });
};

exports.delete = async (req, res) => {
  await deleteMovie(req);

  res.status(200).render("movies/index", {
    movies: await getMovies(req),
    title: "Lista de películas",
    successMessage: "Película borrada exitosamente",
  });
};
