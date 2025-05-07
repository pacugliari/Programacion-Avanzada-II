const genres = require("../models/genres");

const getgenres = async () => {
  return await genres.getAll();
};

module.exports = {
  getgenres,
};
