const { getCategories } = require("../../services/categories");

const getCategoriesController = async (req, res) => {
  res.status(200).json({ payload: await getCategories() });
};

module.exports = {
  getCategoriesController,
};
