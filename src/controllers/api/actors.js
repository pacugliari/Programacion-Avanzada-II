const { getactors } = require("../../services/actors");

const getactorsController = async (req, res) => {
  let actors = [];
  try {
    actors = await getactors();
    res.status(200).json({ payload: actors });
  } catch (error) {
    res.status(500).json({ message: "Se ha generado un error en el servidor" });
  }
};

module.exports = {
  getactorsController,
};
