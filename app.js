const express = require('express');
const morgan = require('morgan');
const app = express();

// ROUTES
const tourRouter = require('./routes/toursRoutes');
const userRouter = require('./routes/usersRoutes');

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
