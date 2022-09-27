const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');

const tourTouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const golbalErrorHandler = require('./controllers/errorController');

const app = express();

// 1) meddelwares
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  next();
});

app.use((req, res, next) => {
  next();
});

// 3) Routes

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourTouter);

// 404 NOT found

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find [ ${req.originalUrl} ] on this server !`, 404));
});

//golbal Error Handler

app.use(golbalErrorHandler);

// 4) Start Server
module.exports = app;
