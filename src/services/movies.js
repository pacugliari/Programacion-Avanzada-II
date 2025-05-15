const moviesModel = require("../models/movies");
const categoriesModel = require("../models/categories");
const genresModel = require("../models/genres");
const actorsModel = require("../models/actors");
const fs = require("fs");
const path = require("path");
const HttpError = require("../utils/HttpError");

const validarDatosPelicula = async (data) => {
  const { title, category_id, summary, poster, genres, actors } = data;

  if (typeof title !== "string" || title.length > 70) {
    throw new Error("El título debe ser un string de hasta 70 caracteres.");
  }

  if (typeof summary !== "string" || summary.length > 255) {
    throw new Error("El resumen debe ser un string de hasta 255 caracteres.");
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

const getmovies = async (req) => {
  const host = req.headers.host;
  const movies = await moviesModel.getAll();
  return movies
    ? movies.map((p) => ({
        ...p,
        poster: `http://${host}${p.poster}`,
      }))
    : [];
};

const getPeliculaById = async (req) => {
  const { id } = req.params;
  const pelicula = await moviesModel.getOne({ id });
  const host = req.headers.host;

  if (!pelicula)
    throw new HttpError(400, "El ID no corresponde a una pelicula registrada");

  return {
    ...pelicula,
    poster: `http://${host}${pelicula.poster}`,
  };
};

const createPelicula = async (req) => {
  const { title, category_id, summary, genres, actors } = req.body;
  if (!req.file) {
    throw new HttpError(400, "Falta la imagen del poster");
  }

  if (!title || !category_id || !summary || !genres || !actors) {
    fs.unlink(req.file.path, () => {});
    throw new HttpError(400, "Faltan datos relevantes");
  }

  const posterPath = `/posters/${req.file.filename}`;

  const data = {
    ...req.body,
    category_id: Number(category_id),
    poster: `${posterPath}`,
    genres: Array.isArray(genres) ? genres.map(Number) : [Number(genres)],
    actors: Array.isArray(actors) ? actors.map(Number) : [Number(actors)],
  };
  await validarDatosPelicula(data);
  return await moviesModel.create(data);
};

const updatePelicula = async (req) => {
  const { id } = req.params;
  const { titulo, idCategoria, resumen, genres, actors } = req.body;

  if (!req.file) {
    throw new HttpError(400, "Falta la imagen del poster");
  }

  if (!titulo || !idCategoria || !resumen || !genres || !actors) {
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, () => {});
    }
    throw new HttpError(400, "Faltan datos relevantes");
  }

  const pelicula = await getPeliculaById(req);

  if (!pelicula) {
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, () => {});
    }
    throw new HttpError(400, "El ID no corresponde a una película registrada");
  }

  const oldPosterPath = path.join(
    "public",
    "posters",
    pelicula.poster.split("/").pop()
  );

  if (fs.existsSync(oldPosterPath)) {
    fs.unlinkSync(oldPosterPath);
  }

  const posterPath = `/posters/${req.file.filename}`;

  const data = {
    ...req.body,
    idCategoria: Number(idCategoria),
    poster: `${posterPath}`,
    genres: JSON.parse(genres),
    actors: JSON.parse(actors),
  };
  await validarDatosPelicula(data);
  return await moviesModel.update(id, data);
};

const deletePelicula = async (req) => {
  const pelicula = await getPeliculaById(req);

  if(pelicula.blocked) {
    throw new HttpError(
      409,
      "Esta pelicula no se puede eliminar porque está bloqueada"
    );
  }
  const oldPosterPath = path.join("public", "posters", poster.split("/").pop());

  if (fs.existsSync(oldPosterPath)) {
    fs.unlinkSync(oldPosterPath);
  }

  return await moviesModel.deleteOne(id);
};

module.exports = {
  getmovies,
  getPeliculaById,
  createPelicula,
  updatePelicula,
  deletePelicula,
};
