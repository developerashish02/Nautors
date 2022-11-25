const mongoose = require('mongoose');
const fs = require('fs');
const donenv = require('dotenv');

donenv.config({ path: './config.env' });

const Tour = require('../../model/tours');
const db = process.env.DATABASE;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('db is connected successfully');
  });

// READ JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// IMPORT DATA IN DB

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('data successfully loaded');
  } catch (error) {
    console.log(error);
  }

  process.exit();
};

const deleteAll = async () => {
  try {
    await Tour.deleteMany();
    console.log('deleted data successfully');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
}

if (process.argv[2] === '--delete') {
  deleteAll();
}
