const express = require("express");

const tourController = require("../controllers/tourController.js");
const authController = require("../controllers/authController.js");

// 3) ROUTES

const router = express.Router();

//router.param("id", tourController.checkID);

router
  .route("/top-5-rated")
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route("/stats").get(tourController.tourStats);
router.route("/monthly-plan").get(tourController.monthlyPlan);

router
  .route("/")
  .get(authController.protect, tourController.getAllTours)
  //.post(tourController.checkBody, tourController.createTour)
  .post(tourController.createTour);
router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.deleteTour
  );

module.exports = router;
