const {Category} = require("../models");

const getCategories = async () => {
  return await Category.findAll({ raw: true });
};

module.exports = {
  getCategories,
};
