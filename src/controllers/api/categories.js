const { getcategories } = require("../../services/categories");

const getcategoriesController = async (req, res) => {
  let categories = [];

  categories = await getcategories();
  res.status(200).json({ payload: categories });
};

module.exports = {
  getcategoriesController,
};
