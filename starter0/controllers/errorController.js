module.exports = (err, req, res, next) => {
  //   console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

// app.all('*', (req, res, next) => {
//     res.status(404).json({
//       status: 'Fail :(',
//       message: `Can't find [=> ${req.originalUrl} ] on this server !`,
//     });
//     const err = new Error(`Can't find [ ${req.originalUrl} ] on this server !`);
//     err.status = 'Fail :(';
//     err.statusCode = 404;
//   });
