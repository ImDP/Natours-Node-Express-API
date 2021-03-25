const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxLength: [40, 'A tour name must have less or equal than 40 characters'],
      minLength: [10, 'A tour name must have equal or more than 10 characters'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A Tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either easy, medium or difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must not be above 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false, //permanently hides createdAt from output
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

//Document middleware -- runs before .save() and .create() ONLY
tourSchema.pre('save', function (next) {
  //console.log(this);
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre('save', (next) => {
//   console.log('Saving document...');
//   next();
// });

// tourSchema.post('save', (doc, next) => {
//   console.log(doc);
//   next();
// });

//Query Middleware --- reg exp /^find/ means all middleware hooks/strings that include find ie findOne findMany etc
tourSchema.pre(/^find/, function (next) {
  // tourSchema.pre('find', function(next) {

  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, (docs, next) => {
  // eslint-disable-next-line no-console
  //console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  // eslint-disable-next-line no-console
  console.log(docs);
  next();
});

//Aggregation Middleware
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  // eslint-disable-next-line no-console
  console.log(this.pipeline());
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
