const { getcategories } = require("../services/categories");

const getcategoriesController = async (req, res) => {
  let categories = [];
  try {
    categories = await getcategories();
    res.status(200).json({ payload: categories });
  } catch (error) {
    res.status(500).json({ message: "Se ha generado un error en el servidor" });
  }
};

module.exports = {
  getcategoriesController,
};
