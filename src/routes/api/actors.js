const express = require("express");
const router = express.Router();
const { getActorsController } = require("../../controllers/api/actors");

router.get("/", getActorsController);

module.exports = router;
