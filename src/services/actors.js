const ActorRepository = require("../repositories/actor");

const getActors = async () => {
  return await ActorRepository.getAll();
};

module.exports = {
  getActors,
};
