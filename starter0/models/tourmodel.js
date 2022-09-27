const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'a Tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [
        40,
        'a tour name must have at most less or equal then 40 characters',
      ],
      minlength: [
        10,
        'a tour name must have at most more or equal then 10 characters',
      ],
      // validate: [validator.isAlpha, 'tour name must only characters'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'a Tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'a Tour must have a Groupe Size'],
    },
    difficulty: {
      type: String,
      required: [true, 'a Tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: ' difficulty is : iether : easy , medium , difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'ratings must be above 1.0'],
      max: [5, 'ratings must be above 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'a Tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'discount price ({VALUE}) should be below regular price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'a Tour must have a destination'],
    },
    destination: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'a Tour must have a Cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  console.log(`query TOOK ${Date.now() - this.start} milliseconds`);

  next();
});

// aggregation middleware
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  console.log(this.pipeline());
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
