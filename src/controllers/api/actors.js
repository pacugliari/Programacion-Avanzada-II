const { getActors } = require("../../services/actors");
const ResponseBuilder = require("../../utils/api-response");

const getActorsController = async (req, res) => {
  res
    .status(200)
    .json(
      ResponseBuilder.success(
        await getActors(),
        "Lista de actores obtenida exitosamente"
      )
    );
};

module.exports = {
  getActorsController,
};
