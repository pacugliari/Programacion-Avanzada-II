const CatalogRepository = require("../repositories/catalog");
const CategoryRepository = require("../repositories/category");
const GenreRepository = require("../repositories/genre");
const ActorRepository = require("../repositories/actor");
const {
  create,
  deleteOne,
  update,
  toggleBlockStatus,
} = require("../repositories/movies");
const HttpError = require("../utils/http-error");
const User = require("../models/user");
const cloudinary = require("../config/cloudinary");

const validarDatosPelicula = async (data) => {
  const { title, category_id, summary, poster, genres, actors } = data;

  if (typeof title !== "string" || title.length > 70) {
    throw new HttpError(400, "Título inválido")
      .setErrors([{ title: "Debe ser un texto de hasta 70 caracteres" }]);
  }

  if (typeof summary !== "string" || summary.length > 500) {
    throw new HttpError(400, "Resumen inválido")
      .setErrors([{ summary: "Debe ser un texto de hasta 500 caracteres" }]);
  }

  if (typeof poster !== "string" || !poster.toLowerCase().endsWith(".jpg")) {
    throw new HttpError(400, "Poster inválido")
      .setErrors([{ poster: "Debe ser una imagen con extensión .jpg" }]);
  }

  const categoriaExiste = await CategoryRepository.getOne({ idCategoria: category_id });
  if (!categoriaExiste) {
    throw new HttpError(400, "Categoría inexistente")
      .setErrors([{ category_id: "La categoría especificada no existe" }]);
  }

  if (!Array.isArray(genres) || genres.some((g) => typeof g !== "number")) {
    throw new HttpError(400, "Géneros inválidos")
      .setErrors([{ genres: "Debe ser un array de IDs numéricos" }]);
  }

  for (const idGenero of genres) {
    const existe = await GenreRepository.getOne(idGenero);
    if (!existe) {
      throw new HttpError(400, "Género no encontrado")
        .setErrors([{ genres: `El género con ID ${idGenero} no existe` }]);
    }
  }

  if (!Array.isArray(actors) || actors.some((a) => typeof a !== "number")) {
    throw new HttpError(400, "Actores inválidos")
      .setErrors([{ actors: "Debe ser un array de IDs numéricos" }]);
  }

  for (const idActor of actors) {
    const existe = await ActorRepository.getOne(idActor);
    if (!existe) {
      throw new HttpError(400, "Actor no encontrado")
        .setErrors([{ actors: `El actor con ID ${idActor} no existe` }]);
    }
  }
};

const getMovies = async () => {
  const movies = await CatalogRepository.getAll();
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
  const pelicula = await CatalogRepository.getOne({ id });

  if (!pelicula) {
    throw new HttpError(400, "El ID no corresponde a una película registrada")
      .setErrors([{ id: "No se encontró una película con ese ID" }]);
  }

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
    throw new HttpError(400, "Falta la imagen del poster")
      .setErrors([{ poster: "Debe adjuntar una imagen .jpg como poster" }]);
  }

  if (!title || !category_id || !summary || !genres || !actors) {
    await cloudinary.uploader.destroy(req.file.filename);
    throw new HttpError(400, "Faltan datos relevantes")
      .setErrors([{ fields: "Debe completar todos los campos requeridos" }]);
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
  return await create(data);
};

const updateMovie = async (req) => {
  const { id } = req.params;
  const { title, category_id, summary, genres, actors } = req.body;
  const userId = req.session.user?._id || req.payload.id;
  const user = await User.findById(userId);

  if (!user) {
    if (req.file) await cloudinary.uploader.destroy(req.file.filename);
    throw new HttpError(403, "No tenés permisos para modificar esta película")
      .setErrors([{ user: "Usuario no autorizado" }]);
  }

  if (!title || !category_id || !summary || !genres || !actors) {
    if (req.file) await cloudinary.uploader.destroy(req.file.filename);
    throw new HttpError(400, "Faltan datos relevantes")
      .setErrors([{ fields: "Debe completar todos los campos requeridos" }]);
  }

  const pelicula = await getMovieById(req);
  if (!pelicula) {
    if (req.file) await cloudinary.uploader.destroy(req.file.filename);
    throw new HttpError(404, "Película no encontrada")
      .setErrors([{ id: "No existe la película a actualizar" }]);
  }

  if (user.role !== "admin" && pelicula.blocked) {
    if (req.file) await cloudinary.uploader.destroy(req.file.filename);
    throw new HttpError(403, "La película está bloqueada y no puede modificarse")
      .setErrors([{ blocked: "Solo un admin puede modificar películas bloqueadas" }]);
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
  return await update(id, data);
};

const deleteMovie = async (req) => {
  const pelicula = await getMovieById(req);
  const userId = req.session.user?._id || req.payload.id;
  const user = await User.findById(userId);

  if (!user) {
    throw new HttpError(403, "No tenés permisos para eliminar esta película")
      .setErrors([{ user: "Usuario no autorizado" }]);
  }

  if (user.role !== "admin" && pelicula.blocked) {
    throw new HttpError(403, "La película está bloqueada y no puede eliminarse")
      .setErrors([{ blocked: "Solo un admin puede eliminar películas bloqueadas" }]);
  }

  if (pelicula.poster_id) {
    await cloudinary.uploader.destroy(pelicula.poster_id);
  }

  return await deleteOne(pelicula.id);
};

const toggleBlockStatusMovie = async (req) => {
  const pelicula = await getMovieById(req);
  const userId = req.session.user?._id || req.payload.id;
  const user = await User.findById(userId);

  if (!user || user.role !== "admin") {
    throw new HttpError(403, "No tenés permisos para modificar esta película")
      .setErrors([{ user: "Solo administradores pueden bloquear o desbloquear" }]);
  }

  if (!pelicula) {
    throw new HttpError(404, "Película no encontrada")
      .setErrors([{ id: "No se encontró la película" }]);
  }

  await toggleBlockStatus(pelicula.id);

  return pelicula.blocked ? "desbloqueada" : "bloqueada";
};

module.exports = {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  toggleBlockStatusMovie,
};
