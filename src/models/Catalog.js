const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize"); // Ajusta a tu configuración

const Catalog = sequelize.define(
  "Catalog",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    poster: {
      type: DataTypes.STRING, // URL string
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
      type: DataTypes.JSON, // Guardamos JSON directamente
      allowNull: true,
    },
    resumen: {
      type: DataTypes.TEXT, // Texto largo
      allowNull: true,
    },
    temporadas: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    generos: {
      type: DataTypes.JSON, // JSON con array de géneros
      allowNull: true,
    },
    reparto: {
      type: DataTypes.JSON, // JSON con array de reparto
      allowNull: true,
    },
    trailer: {
      type: DataTypes.STRING, // URL o "N/A"
      allowNull: true,
    },
  },
  {
    tableName: "catalogo", // nombre de la tabla en la base de datos
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
  }
);

const getAll = async () => {
  return await Catalog.findAll({ raw: true });
};

const getOne = async (params) => {
  return await Catalog.findOne({where: params,raw: true});
};

module.exports = {
  Catalog,
  getAll,
  getOne,
};

