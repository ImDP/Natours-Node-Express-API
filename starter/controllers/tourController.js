// eslint-disable-next-line no-unused-vars
const Tour = require('../models/tourModel');

/*
//This is for testing json data
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);
*/

/*
//Middleware check
exports.checkID = (req, res, next, val) => {
  // eslint-disable-next-line no-console
  console.log(`Tour id is: ${val}`);

  if (req.params * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};
*/

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name and/or price',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  // eslint-disable-next-line no-console
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    //results: tours.length,
    //data: {
    // tours,
    //},
  });
};

exports.getTour = (req, res) => {
  // eslint-disable-next-line no-console
  console.log(req.params);
  // eslint-disable-next-line no-unused-vars
  const id = req.params.id * 1;
  /*
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  }); */
};

exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    //data: {
    //  tour: newTour,
    //},
  });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
