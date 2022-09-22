const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);
//
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    requestAT: req.requestTime,
    status: 'success',
    resulta: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;
  const tour = tours.find((element) => element.id === id);

  if (!tour) {
    return res.status(404).send({
      status: '404 Not Found',
      Message: 'Invalid id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tours: tour,
    },
  });
};

exports.createTour = (req, res) => {
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};
exports.updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).send({
      status: '404 Not Found',
      Message: 'Invalid id ...',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '< Update tour here ... >',
    },
  });
};

exports.deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).send({
      status: '404 Not Found',
      Message: 'Invalid id ...',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
