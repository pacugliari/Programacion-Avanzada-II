// models/Genero.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Genre = sequelize.define(
  "Genre",
  {
    idGenero: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "generos",
    timestamps: false,
  }
);

const getAll = async () => {
  return await Genre.findAll({ raw: true });
};

const getOne = async (params) => {
  return await Genre.findOne({ where: params,raw: true});
};

module.exports = {
  Genre,
  getAll,
  getOne,
};
