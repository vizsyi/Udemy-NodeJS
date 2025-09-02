const express = require("express");

const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");

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

router.patch("/updateMe", authController.protect, userController.updateMe);

module.exports = router;
