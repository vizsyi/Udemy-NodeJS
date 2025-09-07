const Tour = require("./../models/tourModel");
const APIFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

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

exports.getAllTours = catchAsync(async (req, res, next) => {
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

  /*   try {
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  } */
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);
  //const tour  = await Tour.findOne({ _id: req.params.id });
  /* const tour = await Tour.findById(req.params.id).populate({
    path: "guides",
    select: "-__v -passwordChangedAt",
  }); // Or simply: .populate("guides");*/

  if (!tour) {
    return next(new AppError("No tour found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: { tour },
  });

  /*   try {
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  } */
});

exports.createTour = catchAsync(async (req, res, next) => {
  //const newTour = new Tour(req.body);
  //newTour.save();

  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      tour: newTour,
    },
  });
});

exports.updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!tour) {
    return next(new AppError("No tour found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: { tour },
  });

  /*   try {
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  } */
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  if (!(await Tour.findByIdAndDelete(req.params.id))) {
    return next(new AppError("No tour found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });

  /*   try {
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  } */
});

exports.tourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: { $toUpper: "$difficulty" },
        numTours: { $sum: 1 },
        numRatings: { $sum: "$ratingsQuantity" },
        avgRating: { $avg: "$ratingsAverage" },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
    {
      $match: { _id: { $ne: "EASY" } },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: { stats },
  });

  /*   try {
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  } */
});

exports.monthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;

  const plan = await Tour.aggregate([
    {
      $unwind: "$startDates",
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$startDates" },
        numTourStats: { $sum: 1 },
        tours: { $push: "$name" },
      },
    },
    {
      $addFields: { month: "$_id" },
    },
    {
      $project: { _id: 0 },
    },
    {
      $sort: {
        numTourStats: -1,
        month: 1,
      },
    },
    {
      $limit: 12,
    },
  ]);

  res.status(200).json({
    status: "success",
    data: { plan },
  });

  /*   try {
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  } */
});
