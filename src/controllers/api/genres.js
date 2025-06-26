const { getGenres } = require("../../services/genres");
const ResponseBuilder = require("../../utils/api-response");

const getGenresController = async (req, res) => {
  res
    .status(200)
    .json(
      ResponseBuilder.success(
        await getGenres(),
        "Lista de géneros obtenida exitosamente"
      )
    );
};

module.exports = {
  getGenresController,
};
