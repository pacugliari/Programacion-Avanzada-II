const express = require("express");
const router = express.Router();
const { getCategoriesController } = require("../../controllers/api/categories");

router.get("/", getCategoriesController);

module.exports = router;
