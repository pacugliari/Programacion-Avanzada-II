const moviesModel = require("../models/movies");
const categoriesModel = require("../models/categories");
const genresModel = require("../models/genres");
const actorsModel = require("../models/actors");
const HttpError = require("../utils/http-error");
const User = require("../models/user");
const cloudinary = require("../config/cloudinary");

const validarDatosPelicula = async (data) => {
  const { title, category_id, summary, poster, genres, actors } = data;

  if (typeof title !== "string" || title.length > 70) {
    throw new Error("El título debe ser un string de hasta 70 caracteres.");
  }

  if (typeof summary !== "string" || summary.length > 500) {
    throw new Error("El resumen debe ser un string de hasta 500 caracteres.");
  }

  if (typeof poster !== "string" || !poster.toLowerCase().endsWith(".jpg")) {
    throw new Error("El poster debe ser una imagen con extensión .jpg");
  }

  const categoriaExiste = await categoriesModel.getOne({
    idCategoria: category_id,
  });
  if (!categoriaExiste) {
    throw new Error("La categoría especificada no existe.");
  }

  if (!Array.isArray(genres) || genres.some((g) => typeof g !== "number")) {
    throw new Error("Los géneros deben ser un array de números.");
  }

  for (const idGenero of genres) {
    const existe = await genresModel.getOne({ idGenero });
    if (!existe) throw new Error(`El género con ID ${idGenero} no existe.`);
  }

  if (!Array.isArray(actors) || actors.some((a) => typeof a !== "number")) {
    throw new Error("Los actors deben ser un array de números.");
  }

  for (const idActor of actors) {
    const existe = await actorsModel.getOne({ idActor });
    if (!existe) throw new Error(`El actor con ID ${idActor} no existe.`);
  }
};

const getMovies = async (req) => {
  const movies = await moviesModel.getAll();
  return movies
    ? movies.map((p) => ({
        ...p,
        reparto: JSON.parse(p.reparto),
        generos: JSON.parse(p.generos),
        categoria: JSON.parse(p.categoria),
      }))
    : [];
};

const getMovieById = async (req) => {
  const { id } = req.params;
  const pelicula = await moviesModel.getOne({ id });

  if (!pelicula)
    throw new HttpError(400, "El ID no corresponde a una pelicula registrada");

  return {
    ...pelicula,
    reparto: JSON.parse(pelicula.reparto),
    generos: JSON.parse(pelicula.generos),
    categoria: JSON.parse(pelicula.categoria),
  };
};

const createMovie = async (req) => {
  const { title, category_id, summary, genres, actors } = req.body;

  if (!req.file) {
    throw new HttpError(400, "Falta la imagen del poster");
  }

  if (!title || !category_id || !summary || !genres || !actors) {
    await cloudinary.uploader.destroy(req.file.filename);
    throw new HttpError(400, "Faltan datos relevantes");
  }

  const data = {
    ...req.body,
    category_id: Number(category_id),
    poster: req.file.path,
    poster_id: req.file.filename,
    genres: Array.isArray(genres) ? genres.map(Number) : [Number(genres)],
    actors: Array.isArray(actors) ? actors.map(Number) : [Number(actors)],
  };

  await validarDatosPelicula(data);
  return await moviesModel.create(data);
};

const updateMovie = async (req) => {
  const { id } = req.params;
  const { title, category_id, summary, genres, actors } = req.body;
  const userId = req.session.user?._id || req.payload.id;
  const user = await User.findById(userId);

  if (!user || user.role !== "admin") {
    throw new HttpError(403, "No tenés permisos para modificar esta película");
  }

  if (!title || !category_id || !summary || !genres || !actors) {
    if (req.file) await cloudinary.uploader.destroy(req.file.filename);
    throw new HttpError(400, "Faltan datos relevantes");
  }

  const pelicula = await getMovieById(req);
  if (!pelicula) {
    if (req.file) await cloudinary.uploader.destroy(req.file.filename);
    throw new HttpError(404, "Película no encontrada");
  }

  let newPoster = pelicula.poster;
  let newPosterId = pelicula.poster_id;

  if (req.file) {
    if (pelicula.poster_id) {
      await cloudinary.uploader.destroy(pelicula.poster_id);
    }
    newPoster = req.file.path;
    newPosterId = req.file.filename;
  }

  const data = {
    ...req.body,
    category_id: Number(category_id),
    poster: newPoster,
    poster_id: newPosterId,
    genres: Array.isArray(genres) ? genres.map(Number) : [Number(genres)],
    actors: Array.isArray(actors) ? actors.map(Number) : [Number(actors)],
  };

  await validarDatosPelicula(data);
  return await moviesModel.update(id, data);
};

const deleteMovie = async (req) => {
  const pelicula = await getMovieById(req);
  const userId = req.session.user?._id || req.payload.id;
  const user = await User.findById(userId);

  if (!user || user.role !== "admin") {
    throw new HttpError(403, "No tenés permisos para modificar esta película");
  }

  if (pelicula.poster_id) {
    await cloudinary.uploader.destroy(pelicula.poster_id);
  }

  return await moviesModel.deleteOne(pelicula.id);
};

module.exports = {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};
