const express = require("express");
const router = express.Router();
const moviesController = require("../../controllers/monolith/movies");
const upload = require("../../middlewares/upload");

router.get("/", moviesController.index);
router.get("/create", moviesController.createForm);
router.get("/edit/:id", moviesController.editForm);
router.get("/delete/:id", moviesController.delete);
router.get("/block/:id", moviesController.block);
router.get("/:id", moviesController.detail);
router.post("/", upload.single("poster"), moviesController.create);
router.put("/:id", upload.single("poster"), moviesController.edit);

module.exports = router;
