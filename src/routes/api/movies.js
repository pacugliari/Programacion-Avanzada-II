const express = require("express");
const router = express.Router();
const {
  getMoviesController,
  getMovieByIdController,
  createMovieController,
  updateMovieController,
  deleteMovieController,
  blockMovieController
} = require("../../controllers/api/movies");
const upload = require("../../middlewares/upload");

router.get("/", getMoviesController);
router.get("/:id", getMovieByIdController);
router.post("/", upload.single("poster"), createMovieController);
router.put("/:id", upload.single("poster"), updateMovieController);
router.delete("/:id", deleteMovieController);
router.post("/block/:id", blockMovieController);

module.exports = router;
