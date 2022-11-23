const mongoose = require('mongoose');

const toursSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'A Tour must have a name'],
    unique: true
  },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    require: [true, 'A Tour must have a name']
  }
});

const Tour = mongoose.model('Tours', toursSchema);

module.exports = Tour;
