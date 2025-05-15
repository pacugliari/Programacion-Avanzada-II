const { getgenres } = require("../../services/genres");

const getgenresController = async (req, res) => {
  let genres = [];

  genres = await getgenres();
  res.status(200).json({ payload: genres });
};

module.exports = {
  getgenresController,
};
