const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Catalog = sequelize.define(
  "Catalog",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    poster: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    poster_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    categoria: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    resumen: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    temporadas: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    generos: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    reparto: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    trailer: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "catalogo",
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
  }
);

module.exports = {
  Catalog,
};
