const categories = require("../models/categories");

const getCategories = async () => {
  return await categories.getAll();
};

module.exports = {
  getCategories,
};
