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

module.exports = {
  Genre,
};
