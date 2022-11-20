const express = require('express');
const fs = require('fs');

const app = express();
// use middleware
app.use(express.json());

const port = 3000;

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Geeting all tours
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours,
    },
  });
});

// get single user
app.get('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id;
  const tour = tours.find((ele) => ele.id === Number(id));

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

// created tour
app.post('/api/v1/tours', (req, res) => {
  const newId = tours.length - 1 + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        message: 'Created Tour successfully',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.listen(port, () => {
  console.log(`App runnign on port ${port}`);
});
