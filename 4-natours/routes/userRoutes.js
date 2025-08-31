const express = require("express");

const authController = require("./../controllers/authController");

// 3) ROUTES

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.patch(
  "/updateMyPassword",
  authController.protect,
  authController.updateMyPassword
);

module.exports = router;
