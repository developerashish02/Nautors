const express = require('express');
const morgan = require('morgan');
const app = express();

// ROUTES
const tourRouter = require('./routes/toursRoutes');
const userRouter = require('./routes/usersRoutes');

app.use(morgan('dev'));
app.use(express.json());

const port = 3000;

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.listen(port);
