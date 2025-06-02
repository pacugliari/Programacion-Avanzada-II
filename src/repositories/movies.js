const { Movie, Trailer } = require("../models");
const sequelize = require("../config/sequelize");

const create = async (data) => {
  const {
    title,
    summary,
    poster,
    category_id,
    actors,
    genres,
    cantidadTemporadas,
    trailer,
    poster_id,
  } = data;

  const t = await sequelize.transaction();

  try {
    const pelicula = await Movie.create(
      {
        titulo: title,
        resumen: summary,
        poster,
        poster_id,
        idCategoria: category_id,
        cantidadTemporadas: cantidadTemporadas ?? "N/A",
      },
      { transaction: t }
    );

    if (actors && actors.length > 0) {
      await pelicula.setActors(actors, { transaction: t });
    }

    if (genres && genres.length > 0) {
      await pelicula.setGenres(genres, { transaction: t });
    }

    await Trailer.create(
      {
        idPelicula: pelicula.idPelicula,
        trailer: trailer || "N/A",
      },
      { transaction: t }
    );

    await t.commit();

    return { id: pelicula.idPelicula, ...data };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const deleteOne = async (id) => {
  const t = await sequelize.transaction();

  try {
    const pelicula = await Movie.findByPk(id, { transaction: t });
    if (!pelicula) {
      await t.rollback();
      return false;
    }

    await pelicula.setActors([], { transaction: t });
    await pelicula.setGenres([], { transaction: t });
    await Trailer.destroy({ where: { idPelicula: id }, transaction: t });
    await pelicula.destroy({ transaction: t });

    await t.commit();
    return true;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const toggleBlockStatus = async (id) => {
  const t = await sequelize.transaction();

  try {
    const pelicula = await Movie.findByPk(id, { transaction: t });
    if (!pelicula) throw new Error("Movie no encontrada");

    pelicula.blocked = !pelicula.blocked;
    await pelicula.save({ transaction: t });

    await t.commit();
    return pelicula.blocked;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const update = async (id, data) => {
  const {
    title,
    summary,
    poster,
    category_id,
    actors,
    genres,
    cantidadTemporadas,
    trailer,
    poster_id,
  } = data;

  const t = await sequelize.transaction();

  try {
    const pelicula = await Movie.findByPk(id, { transaction: t });
    if (!pelicula) throw new Error("Movie no encontrada");

    await pelicula.update(
      {
        titulo: title,
        resumen: summary,
        poster,
        poster_id,
        idCategoria: category_id,
        cantidadTemporadas: cantidadTemporadas ?? "N/A",
      },
      { transaction: t }
    );

    if (actors && Array.isArray(actors)) {
      await pelicula.setActors(actors, { transaction: t });
    } else {
      await pelicula.setActors([], { transaction: t });
    }

    if (genres && Array.isArray(genres)) {
      await pelicula.setGenres(genres, { transaction: t });
    } else {
      await pelicula.setGenres([], { transaction: t });
    }

    const trailerUrl = trailer || "N/A";
    const existingTrailer = await Trailer.findOne({
      where: { idPelicula: id },
      transaction: t,
    });

    if (existingTrailer) {
      await existingTrailer.update({ trailer: trailerUrl }, { transaction: t });
    } else {
      await Trailer.create(
        { idPelicula: id, trailer: trailerUrl },
        { transaction: t }
      );
    }

    await t.commit();
    return { id, ...data };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

module.exports = {
  create,
  deleteOne,
  update,
  toggleBlockStatus,
};
