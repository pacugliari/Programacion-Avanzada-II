const { conn } = require("../config/conn");

const getAll = async () => {
  try {
    const [rows, fields] = await conn.query("SELECT * FROM catalogo;");
    return rows ?? [];
  } catch (error) {
    throw error;
  } finally {
    conn.releaseConnection();
  }
};

const getOne = async (params) => {
  try {
    const [rows, fields] = await conn.query(
      "SELECT * FROM catalogo WHERE ?;",
      params
    );

    return rows[0] || null;
  } catch (error) {
    throw error;
  } finally {
    conn.releaseConnection();
  }
};

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

  const connection = await conn.getConnection();

  try {
    await connection.beginTransaction();

    const [result] = await connection.query(
      `INSERT INTO peliculas (titulo, resumen, poster,poster_id, idCategoria, cantidadTemporadas) VALUES (?, ?,?, ?, ?, ?)`,
      [
        title,
        summary,
        poster,
        poster_id,
        category_id,
        cantidadTemporadas ?? "N/A",
      ]
    );

    const idPelicula = result.insertId;

    for (const idActor of actors) {
      await connection.query(
        `INSERT INTO peliculasrepartos (idPelicula, idActor) VALUES (?, ?)`,
        [idPelicula, idActor]
      );
    }

    for (const idGenero of genres) {
      await connection.query(
        `INSERT INTO peliculasgeneros (idPelicula, idGenero) VALUES (?, ?)`,
        [idPelicula, idGenero]
      );
    }

    const trailerUrl = trailer || "N/A";
    await connection.query(
      `INSERT INTO peliculastrailers (idPelicula, trailer) VALUES (?, ?)`,
      [idPelicula, trailerUrl]
    );

    await connection.commit();
    return { id: idPelicula, ...data };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const deleteOne = async (id) => {
  const connection = await conn.getConnection();

  try {
    await connection.beginTransaction();

    await connection.query(
      `DELETE FROM peliculasrepartos WHERE idPelicula = ?`,
      [id]
    );
    await connection.query(
      `DELETE FROM peliculasgeneros WHERE idPelicula = ?`,
      [id]
    );
    await connection.query(
      `DELETE FROM peliculastrailers WHERE idPelicula = ?`,
      [id]
    );
    const [result] = await connection.query(
      `DELETE FROM peliculas WHERE idPelicula = ?`,
      [id]
    );

    await connection.commit();

    return result.affectedRows > 0;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
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

  const connection = await conn.getConnection();

  try {
    await connection.beginTransaction();

    await connection.query(
      `UPDATE peliculas SET titulo = ?, resumen = ?, poster = ?,poster_id = ?, idCategoria = ?, cantidadTemporadas = ? WHERE idPelicula = ?`,
      [
        title,
        summary,
        poster,
        poster_id,
        category_id,
        cantidadTemporadas ?? "N/A",
        id,
      ]
    );

    // Limpiar relaciones previas
    await connection.query(
      `DELETE FROM peliculasrepartos WHERE idPelicula = ?`,
      [id]
    );
    await connection.query(
      `DELETE FROM peliculasgeneros WHERE idPelicula = ?`,
      [id]
    );
    await connection.query(
      `DELETE FROM peliculastrailers WHERE idPelicula = ?`,
      [id]
    );

    // Insertar nuevas relaciones
    for (const idActor of actors) {
      await connection.query(
        `INSERT INTO peliculasrepartos (idPelicula, idActor) VALUES (?, ?)`,
        [id, idActor]
      );
    }

    for (const idGenero of genres) {
      await connection.query(
        `INSERT INTO peliculasgeneros (idPelicula, idGenero) VALUES (?, ?)`,
        [id, idGenero]
      );
    }

    const trailerUrl = trailer || "N/A";
    await connection.query(
      `INSERT INTO peliculastrailers (idPelicula, trailer) VALUES (?, ?)`,
      [id, trailerUrl]
    );

    await connection.commit();
    return { id, ...data };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  deleteOne,
  update,
};
