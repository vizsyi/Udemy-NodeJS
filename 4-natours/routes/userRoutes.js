const express = require("express");

const authController = require("./../controllers/authController");

// 3) ROUTES

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

module.exports = router;
