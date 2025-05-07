const { getgenres } = require("../services/genres");

const getgenresController = async (req, res) => {
  let genres = [];
  try {
    genres = await getgenres();
    res.status(200).json({ payload: genres });
  } catch (error) {
    res.status(500).json({ message: "Se ha generado un error en el servidor" });
  }
};

module.exports = {
  getgenresController,
};
