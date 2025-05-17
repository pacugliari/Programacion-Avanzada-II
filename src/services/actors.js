const actors = require("../models/actors");

const getActors = async () => {
  return await actors.getAll();
};

module.exports = {
  getActors,
};
