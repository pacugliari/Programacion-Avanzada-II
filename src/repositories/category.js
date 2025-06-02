const { Category } = require("../models/index");

const getAll = async () => {
  return await Category.findAll({ raw: true });
};

const getOne = async (params) => {
  return await Category.findOne({ where: params, raw: true });
};

module.exports = {
  getAll,
  getOne,
};
