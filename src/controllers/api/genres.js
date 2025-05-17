const { getGenres } = require("../../services/genres");

const getGenresController = async (req, res) => {
  res.status(200).json({ payload: await getGenres() });
};

module.exports = {
  getGenresController,
};
