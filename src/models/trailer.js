const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Movie = require('./movie');

const Trailer = sequelize.define('Trailer', {
  idPeliculaTrailer: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idPelicula: {
    type: DataTypes.INTEGER,
    references: { model: Movie, key: 'idPelicula' }
  },
  trailer: DataTypes.STRING,
}, {
  tableName: 'peliculastrailers',
  timestamps: false
});

module.exports = Trailer;
