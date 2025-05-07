const { conn } = require("../config/conn");

const getAll = async () => {
  try {
    const [rows, fields] = await conn.query("SELECT * FROM generos;");
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
      "SELECT * FROM generos WHERE ?;",
      params
    );

    return rows[0] || null;
  } catch (error) {
    throw error;
  } finally {
    conn.releaseConnection();
  }
};

module.exports = {
  getAll,
  getOne,
};
