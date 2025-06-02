const GenreRepository = require("../repositories/genre");

const getGenres = async () => {
  return await GenreRepository.getAll();
};

module.exports = {
  getGenres,
};
