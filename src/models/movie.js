const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Movie = sequelize.define(
  "Movie",
  {
    idPelicula: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: DataTypes.STRING,
    resumen: DataTypes.TEXT,
    poster: DataTypes.STRING,
    poster_id: DataTypes.STRING,
    idCategoria: DataTypes.INTEGER,
    cantidadTemporadas: {
      type: DataTypes.STRING,
      defaultValue: "N/A",
    },
    blocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "peliculas",
    timestamps: false,
  }
);

module.exports = {
  Movie,
};
