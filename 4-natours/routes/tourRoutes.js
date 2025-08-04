const express = require("express");

const tourController = require("../controllers/tourController.js");
// 3) ROUTES

const router = express.Router();

//router.param("id", tourController.checkID);

router
  .route("/top-5-rated")
  .get(tourController.aliasTopTours, tourController.getAllTours);

router
  .route("/")
  .get(tourController.getAllTours)
  //.post(tourController.checkBody, tourController.createTour)
  .post(tourController.createTour);
router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
