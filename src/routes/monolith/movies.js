const express = require("express");
const router = express.Router();
const moviesController = require("../../controllers/monolith/movies");

router.get("/", moviesController.index);
router.get("/create", moviesController.create);
router.get("/delete/:id", moviesController.delete);
router.get("/:id", moviesController.detail);

module.exports = router;
