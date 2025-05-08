const express = require("express");
const router = express.Router();
const { getcategoriesController } = require("../../controllers/api/categories");

router.get("/", getcategoriesController);

module.exports = router;
