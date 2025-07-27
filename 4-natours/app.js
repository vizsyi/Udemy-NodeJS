const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes");

const app = express();

// 1) MIDDLEWARES

app.use(morgan("dev"));

app.use(express.json()); //to use to read the body of request

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2) ROUTE HANDLERS in the Controllers

// 3) ROUTES

app.use("/api/v1/tours", tourRouter);

module.exports = app;
