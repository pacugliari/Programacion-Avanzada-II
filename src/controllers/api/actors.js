const { getactors } = require("../../services/actors");

const getactorsController = async (req, res) => {
  let actors = [];

  actors = await getactors();
  res.status(200).json({ payload: actors });
};

module.exports = {
  getactorsController,
};
