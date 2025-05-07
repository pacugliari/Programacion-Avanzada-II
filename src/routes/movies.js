const express = require("express");
const router = express.Router();
const {
  getmoviesController,
  getPeliculaByIdController,
  createPeliculaController,
  updatePeliculaController,
  deletePeliculaController,
} = require("../controllers/movies");
const upload = require("../middlewares/upload");

router.get("/", getmoviesController);
router.get("/:id", getPeliculaByIdController);
router.post("/", upload.single("poster"), createPeliculaController);
router.put("/:id", upload.single("poster"), updatePeliculaController);
router.delete("/:id", deletePeliculaController);

module.exports = router;
