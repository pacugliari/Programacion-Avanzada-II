const {Actor} = require("../models");

const getActors = async () => {
  return await Actor.findAll({ raw: true });
};

module.exports = {
  getActors,
};
