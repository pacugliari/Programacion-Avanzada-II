const CategoryRepository = require("../repositories/category");

const getCategories = async () => {
  return await CategoryRepository.getAll();
};

module.exports = {
  getCategories,
};
