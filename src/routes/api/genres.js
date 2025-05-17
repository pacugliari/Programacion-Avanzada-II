const express = require("express");
const router = express.Router();
const { getGenresController } = require("../../controllers/api/genres");

router.get("/", getGenresController);

module.exports = router;
