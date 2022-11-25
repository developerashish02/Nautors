const mongoose = require('mongoose');

const toursSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'A Tour must have a name'],
    trim: true,
    unique: true
  },

  duration: {
    type: Number,
    required: [true, 'A Tour must have a duration']
  },

  maxGroupSize: {
    type: Number,
    required: [true, 'A Tour must have a max group size']
  },

  difficulty: {
    type: String,
    required: [true, 'A Tour must have a difficulty']
  },

  ratingsAverage: {
    type: Number,
    default: 4.5
  },

  ratingsQuantity: {
    type: Number,
    defualt: 0
  },
  price: {
    type: Number,
    require: [true, 'A Tour must have a name']
  },

  priceDiscount: Number,

  summary: {
    type: String,
    required: [true, 'A Tour must have a summary'],
    trim: true
  },

  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'A Tour must have a imageCover'],
    trim: true
  },

  images: [String],

  createdAt: {
    type: Date,
    defualt: Date.now()
  },

  startDates: [Date]
});

const Tour = mongoose.model('Tours', toursSchema);

module.exports = Tour;
