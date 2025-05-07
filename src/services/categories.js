const categories = require("../models/categories");

const getcategories = async () => {
  return await categories.getAll();
};

module.exports = {
  getcategories,
};
