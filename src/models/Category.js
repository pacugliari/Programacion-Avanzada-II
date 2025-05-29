// models/Categoria.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Category = sequelize.define(
  "Category",
  {
    idCategoria: {
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
    tableName: "categorias",
    timestamps: false,
  }
);

module.exports = {
  Category,
};
