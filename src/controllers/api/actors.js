const { getActors } = require("../../services/actors");

const getActorsController = async (req, res) => {
  res.status(200).json({ payload: await getActors() });
};

module.exports = {
  getActorsController,
};
