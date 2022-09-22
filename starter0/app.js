const express = require('express');
const morgan = require('morgan');

const tourTouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) meddelwares
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  console.log('hello from meddelware  ');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) Routes

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourTouter);
// 4) Start Server

const port = 8080;
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
