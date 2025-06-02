const { Movie } = require("./movie");
const { Actor } = require("./actor");
const { Genre } = require("./genre");
const { Category } = require("./category");
const { Catalog } = require("./catalog");
const Trailer = require("./trailer");

Movie.belongsToMany(Actor, {
  through: "peliculasrepartos",
  foreignKey: "idPelicula",
  otherKey: "idActor",
  timestamps: false,
});
Actor.belongsToMany(Movie, {
  through: "peliculasrepartos",
  foreignKey: "idActor",
  otherKey: "idPelicula",
  timestamps: false,
});

Movie.belongsToMany(Genre, {
  through: "peliculasgeneros",
  foreignKey: "idPelicula",
  otherKey: "idGenero",
  timestamps: false,
});
Genre.belongsToMany(Movie, {
  through: "peliculasgeneros",
  foreignKey: "idGenero",
  otherKey: "idPelicula",
  timestamps: false,
});

Movie.hasOne(Trailer, {
  foreignKey: "idPelicula",
});
Trailer.belongsTo(Movie, { foreignKey: "idPelicula" });

module.exports = { Movie, Actor, Genre, Trailer, Category, Catalog };
