const express = require("express");
const router = express.Router();
const authController = require("../../controllers/monolith/auth");

router.get("/login", authController.loginForm);
router.get("/register", authController.registerForm);
router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/logout", authController.logout);

module.exports = router;
