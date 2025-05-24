const mysql = require("mysql2");
const dotenv = require("dotenv");

const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${env}` });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection((error, connection) => {
  if (error) {
    console.log("Hubo un error de conexión", error);
  } else {
    console.log("✅ Conexión a la base de datos fue exitosa: "+process.env.DB_HOST);
    connection.release();
  }
});

module.exports = {
  conn: pool.promise(),
};
