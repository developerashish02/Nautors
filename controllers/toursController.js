const fs = require('fs');

const tourControllers = require('../model/tours');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.bodyContain = (req, res, next) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({
      status: 'error',
      message: 'bad request'
    });
  }

  next();
};

exports.checkId = (req, res, next, val) => {
  const { id } = req.body;
  if (id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id'
    });
  }

  next();
};

exports.getAllTours = (req, res) => {
  const testTour = new tourControllers({
    name: 'The Ganpatipule',
    rating: 4.7,
    price: 499
  });

  testTour
    .save()
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log('err while creating tour');
    });

  res.status(200).json({
    status: 'success',
    result: tours.length,
    time: req.reqestTime,
    data: {
      tours
    }
  });
};

exports.getTour = (req, res) => {
  const { id } = req.body.id;
  const tour = tours.find(ele => ele.id === Number(id));

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
};

exports.createTour = (req, res) => {
  const newId = tours.length - 1 + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        message: 'Created Tour successfully',
        data: {
          tour: newTour
        }
      });
    }
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Updated User Successfully',
    data: '<h1> Updated </h1>'
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    message: 'deleted successfully'
  });
};
