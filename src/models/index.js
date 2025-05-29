// models/index.js (para relaciones)
const { Movie } = require("./Movie");
const { Actor } = require("./Actor");
const { Genre } = require("./Genre");
const { Category } = require("./Category");
const { Catalog } = require("./Catalog");
const Trailer = require("./Trailer");

// Relaciones muchos a muchos
Movie.belongsToMany(Actor, {
  through: "peliculasrepartos",
  foreignKey: "idPelicula",
  otherKey: "idActor",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  timestamps: false,
});
Actor.belongsToMany(Movie, {
  through: "peliculasrepartos",
  foreignKey: "idActor",
  otherKey: "idPelicula",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  timestamps: false,
});

Movie.belongsToMany(Genre, {
  through: "peliculasgeneros",
  foreignKey: "idPelicula",
  otherKey: "idGenero",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  timestamps: false,
});
Genre.belongsToMany(Movie, {
  through: "peliculasgeneros",
  foreignKey: "idGenero",
  otherKey: "idPelicula",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  timestamps: false,
});

Movie.hasOne(Trailer, {
  foreignKey: "idPelicula",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Trailer.belongsTo(Movie, { foreignKey: "idPelicula" });

module.exports = { Movie, Actor, Genre, Trailer, Category, Catalog };
