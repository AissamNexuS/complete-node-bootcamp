const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const MongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRouter');

const app = express();

// 1) Globale MIDDLEWARES
// Security HTTP headers
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit req from same ip
const limiter = rateLimit({
  max: 100000,
  windowMs: 60 * 60 * 1000,
  message: {
    message: 'Too many requests from this IP , please try again in an hour !!'
  }
});
app.use('/api', limiter);

// body parser ,reading data from the body in to req.body
app.use(express.json(/*{ limit: '10kb' }*/));

// Data sanitization against No SQL query injection {exmaple :{"email": {"$gt":""}}} login without need email
app.use(MongoSanitize());

//Data sanitization against XSS {exmaple :inpute html ...}
app.use(xss());

//Prevent paramter pollution {duplicate filtter ...}
app.use(
  hpp({
    whitelist: [
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'duration',
      'price'
    ]
  })
);

// serving static files
app.use(express.static(`${__dirname}/public`));

// SyntaxError err
app.use(bodyParser.json());
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError)
    return res.status(500).json({
      status: 500,
      SyntaxError: true,
      message: 'The body of your request is not valid json!'
    });
  next();
});

// test middelware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/review', reviewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
