const actors = require("../models/actors");

const getactors = async () => {
  return await actors.getAll();
};

module.exports = {
  getactors,
};
