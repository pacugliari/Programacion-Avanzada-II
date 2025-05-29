const { Category } = require("../models");

const getGenres = async () => {
  return await Category.findAll({ raw: true });
};

module.exports = {
  getGenres,
};
