const mongoose = require('mongoose');

const donenv = require('dotenv');

donenv.config({ path: './config.env' });

const app = require('./app');

const db = process.env.DATABASE;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('db is connected successfully');
  });

// mongoose.connect();
const port = process.env.PORT || 3000;
app.listen(port);
