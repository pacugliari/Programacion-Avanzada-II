const { getActors } = require("../../services/actors");
const { getCategories } = require("../../services/categories");
const { getGenres } = require("../../services/genres");
const {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  toggleBlockStatusMovie,
} = require("../../services/movies");

exports.index = async (req, res) => {
  return res.render("movies/index", {
    movies: await getMovies(req),
    title: "Lista de peliculas",
  });
};

exports.detail = async (req, res) => {
  return res.render("movies/detail", {
    movie: await getMovieById(req),
    title: "Detalle de pelicula",
  });
};

exports.createForm = async (req, res) => {
  return res.render("movies/create", {
    title: "Crear pelicula",
    actors: await getActors(),
    genres: await getGenres(),
    categories: await getCategories(),
  });
};

exports.editForm = async (req, res) => {
  return res.render("movies/edit", {
    title: "Editar pelicula",
    actors: await getActors(),
    genres: await getGenres(),
    categories: await getCategories(),
    movie: await getMovieById(req),
  });
};

exports.create = async (req, res) => {
  await createMovie(req);

  return res.status(201).render("movies/index", {
    movies: await getMovies(req),
    title: "Lista de películas",
    successMessage: "Película creada exitosamente",
  });
};

exports.edit = async (req, res) => {
  await updateMovie(req);

  return res.status(201).render("movies/index", {
    movies: await getMovies(req),
    title: "Lista de películas",
    successMessage: "Película modificada exitosamente",
  });
};

exports.delete = async (req, res) => {
  await deleteMovie(req);

  return res.status(200).render("movies/index", {
    movies: await getMovies(req),
    title: "Lista de películas",
    successMessage: "Película borrada exitosamente",
  });
};

exports.block = async (req, res) => {
  const status = await toggleBlockStatusMovie(req);

  return res.status(200).render("movies/index", {
    movies: await getMovies(req),
    title: "Lista de películas",
    successMessage: `Película ${status} exitosamente`,
  });
};
