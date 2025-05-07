const express = require("express");
const router = express.Router();
const { getactorsController } = require("../controllers/actors");

router.get("/", getactorsController);

module.exports = router;
