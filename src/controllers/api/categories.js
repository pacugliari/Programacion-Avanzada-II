const { getCategories } = require("../../services/categories");
const ResponseBuilder = require("../../utils/api-response");

const getCategoriesController = async (req, res) => {
  res
    .status(200)
    .json(
      ResponseBuilder.success(
        await getCategories(),
        "Lista de categorías obtenida exitosamente"
      )
    );
};

module.exports = {
  getCategoriesController,
};
