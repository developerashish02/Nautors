const express = require('express');
const morgan = require('morgan');
const app = express();

// ROUTES
const tourRouter = require('./routes/toursRoutes');
const userRouter = require('./routes/usersRoutes');

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
