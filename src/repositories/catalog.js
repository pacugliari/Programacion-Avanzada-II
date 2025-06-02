const { Catalog } = require("../models/index");


const getAll = async () => {
  return await Catalog.findAll({ raw: true });
};

const getOne = async (params) => {
  return await Catalog.findOne({where: params,raw: true});
};

module.exports = {
  getAll,
  getOne,
};

