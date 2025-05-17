const genres = require("../models/genres");

const getGenres = async () => {
  return await genres.getAll();
};

module.exports = {
  getGenres,
};
