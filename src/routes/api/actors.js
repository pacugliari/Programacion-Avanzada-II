const express = require("express");
const router = express.Router();
const { getactorsController } = require("../../controllers/api/actors");

router.get("/", getactorsController);

module.exports = router;
