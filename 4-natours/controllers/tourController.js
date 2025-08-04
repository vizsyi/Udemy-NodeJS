const Tour = require("./../models/tourModel");
const APIFeatures = require("./../utils/apiFeatures");

// 1) ALIASING
exports.aliasTopTours = (req, res, next) => {
  let extraUrl = "";

  if (!req.query.limit) {
    extraUrl = (req.url.includes("?") ? "&" : "?") + "limit=5";
  }
  if (!req.query.sort) {
    extraUrl += "&sort=-ratingsAverage,price";
  }
  if (!req.query.fields) {
    extraUrl += "&fields=name,price,ratingsAverage,summary,difficulty";
  }
  if (extraUrl !== "") req.url += extraUrl;

  next();
};

// 2) ROUTE HANDLERS

exports.getAllTours = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = await new APIFeatures(Tour, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginateAsync();

    const tours = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: tours.length,
      data: { tours },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    //const tour  = await Tour.findOne({ _id: req.params.id });
    res.status(200).json({
      status: "success",
      data: { tour },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.createTour = async (req, res) => {
  //const newTour = new Tour(req.body);
  //newTour.save();

  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: { tour },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
