const express = require("express");
const router = express.Router();
const { getgenresController } = require("../../controllers/api/genres");

router.get("/", getgenresController);

module.exports = router;
