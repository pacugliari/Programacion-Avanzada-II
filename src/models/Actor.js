// models/Actor.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Actor = sequelize.define(
  "Actor",
  {
    idActor: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "actores",
    timestamps: false,
  }
);

module.exports = {
  Actor,
};
