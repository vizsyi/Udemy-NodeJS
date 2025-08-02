const fs = require("fs");
const express = require("express");

const app = express();

// 1) MIDDLEWARES

app.use(express.json()); //to use to read the body of request

// 1) MIDDLEWARES

// Param middlewares
const checkID = (req, res, next, val) => {
  const id = val * 1,
    tour = tours.find((t) => t.id === id);

  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  next();
};

const checkBody = (req, res, next, val) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "fail",
      message: "Missing name or price",
    });
  }

  next();
};

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 2) ROUTE HANDLERS

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: { tours },
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1,
    tour = tours.find((t) => t.id === id);

  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: { tour },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: { tour: newTour },
      });
    }
  );
};

const updateTour = (req, res) => {
  const id = req.params.id * 1,
    tour = tours.find((t) => t.id === id);

  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: { tour: "<Updated tour here...>" },
  });
};

const deleteTour = (req, res) => {
  const id = req.params.id * 1,
    tour = tours.find((t) => t.id === id);

  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
};

// 3) ROUTES

//app.get("/api/v1/tours/", getAllTours);
//app.get("/api/v1/tours/:id", getTour);
//app.post("/api/v1/tours/", createTour);
//app.patch("/api/v1/tours/:id", updateTour);
//app.delete("/api/v1/tours/:id", deleteTour);

//3.3 2nd version

app.route("/api/v1/tours").get(getAllTours).post(createTour);
app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

//3.3 3rd version
const router = express.Router();

router.param("id", tourController.checkID);

router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);
router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

// 4) START SERVER

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
