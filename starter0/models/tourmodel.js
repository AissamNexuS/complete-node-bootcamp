const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'a Tour must have a name'],
    unique: true,
  },
  duration: {
    type: Number,
    required: [true, 'a Tour must have a duration'],
  },
  maxGroupeSize: {
    type: Number,
    required: [true, 'a Tour must have a Groupe Size'],
  },
  difficulty: {
    type: String,
    required: [true, 'a Tour must have a difficulty'],
  },
  ratingAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'a Tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
