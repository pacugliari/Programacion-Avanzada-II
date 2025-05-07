const moviesModel = require("../models/movies");
const categoriesModel = require("../models/categories");
const genresModel = require("../models/genres");
const actorsModel = require("../models/actors");

const validarDatosPelicula = async (data) => {
  const { titulo, idCategoria, resumen, poster, genres, actors } = data;

  if (typeof titulo !== "string" || titulo.length > 70) {
    throw new Error("El título debe ser un string de hasta 70 caracteres.");
  }

  if (typeof resumen !== "string" || resumen.length > 255) {
    throw new Error("El resumen debe ser un string de hasta 255 caracteres.");
  }

  if (typeof poster !== "string" || !poster.toLowerCase().endsWith(".jpg")) {
    throw new Error("El poster debe ser una imagen con extensión .jpg");
  }

  const categoriaExiste = await categoriesModel.getOne({ idCategoria });
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

const getmovies = async () => {
  return await moviesModel.getAll();
};

const getPeliculaById = async (id) => {
  return await moviesModel.getOne({ id });
};

const createPelicula = async (data) => {
  await validarDatosPelicula(data);
  return await moviesModel.create(data);
};

const updatePelicula = async (id, data) => {
  await validarDatosPelicula(data);
  return await moviesModel.update(id, data);
};

const deletePelicula = async (id) => {
  return await moviesModel.deleteOne(id);
};

module.exports = {
  getmovies,
  getPeliculaById,
  createPelicula,
  updatePelicula,
  deletePelicula,
};
