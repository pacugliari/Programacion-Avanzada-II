const { conn } = require("../config/conn");

const getAll = async () => {
  try {
    const [rows, fields] = await conn.query("SELECT * FROM catalogo;");
    return rows;
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
    titulo,
    resumen,
    poster,
    idCategoria,
    actors,
    genres,
    cantidadTemporadas,
    trailer,
  } = data;

  const connection = await conn.getConnection();

  try {
    await connection.beginTransaction();

    const [result] = await connection.query(
      `INSERT INTO movies (titulo, resumen, poster, idCategoria, cantidadTemporadas) VALUES (?, ?, ?, ?, ?)`,
      [titulo, resumen, poster, idCategoria, cantidadTemporadas ?? "N/A"]
    );

    const idPelicula = result.insertId;

    for (const idActor of actors) {
      await connection.query(
        `INSERT INTO moviesrepartos (idPelicula, idActor) VALUES (?, ?)`,
        [idPelicula, idActor]
      );
    }

    for (const idGenero of genres) {
      await connection.query(
        `INSERT INTO moviesgenres (idPelicula, idGenero) VALUES (?, ?)`,
        [idPelicula, idGenero]
      );
    }

    const trailerUrl = trailer || "N/A";
    await connection.query(
      `INSERT INTO moviestrailers (idPelicula, trailer) VALUES (?, ?)`,
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

    await connection.query(`DELETE FROM moviesrepartos WHERE idPelicula = ?`, [
      id,
    ]);
    await connection.query(`DELETE FROM moviesgenres WHERE idPelicula = ?`, [
      id,
    ]);
    await connection.query(`DELETE FROM moviestrailers WHERE idPelicula = ?`, [
      id,
    ]);
    const [result] = await connection.query(
      `DELETE FROM movies WHERE idPelicula = ?`,
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
    titulo,
    resumen,
    poster,
    idCategoria,
    actors,
    genres,
    cantidadTemporadas,
    trailer,
  } = data;

  const connection = await conn.getConnection();

  try {
    await connection.beginTransaction();

    await connection.query(
      `UPDATE movies SET titulo = ?, resumen = ?, poster = ?, idCategoria = ?, cantidadTemporadas = ? WHERE idPelicula = ?`,
      [titulo, resumen, poster, idCategoria, cantidadTemporadas ?? "N/A", id]
    );

    // Limpiar relaciones previas
    await connection.query(`DELETE FROM moviesrepartos WHERE idPelicula = ?`, [
      id,
    ]);
    await connection.query(`DELETE FROM moviesgenres WHERE idPelicula = ?`, [
      id,
    ]);
    await connection.query(`DELETE FROM moviestrailers WHERE idPelicula = ?`, [
      id,
    ]);

    // Insertar nuevas relaciones
    for (const idActor of actors) {
      await connection.query(
        `INSERT INTO moviesrepartos (idPelicula, idActor) VALUES (?, ?)`,
        [id, idActor]
      );
    }

    for (const idGenero of genres) {
      await connection.query(
        `INSERT INTO moviesgenres (idPelicula, idGenero) VALUES (?, ?)`,
        [id, idGenero]
      );
    }

    const trailerUrl = trailer || "N/A";
    await connection.query(
      `INSERT INTO moviestrailers (idPelicula, trailer) VALUES (?, ?)`,
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
