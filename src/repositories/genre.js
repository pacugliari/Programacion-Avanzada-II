const { Genre } = require("../models/index");

const getAll = async () => {
  return await Genre.findAll({ raw: true });
};

const getOne = async (params) => {
  return await Genre.findOne({ where: params, raw: true });
};

module.exports = {
  getAll,
  getOne,
};
