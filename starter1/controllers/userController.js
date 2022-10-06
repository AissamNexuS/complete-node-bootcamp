const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./hendlerFactory');

const fillerObj = (obj, ...allowedFields) => {
  //loop for object in req.body
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1)create err if user POSTs password date
  if (req.body.password || req.body.passwordConfirm) {
    next(
      new AppError(
        'this route is not for password upadtes . Please use /updateMyPassword . ',
        400
      )
    );
  }
  // 2) filltred ouut unwanted fields names that are not allowed to be update
  const filtterBody = fillerObj(req.body, 'name', 'email');

  // 3) update document
  const updateUser = await User.findByIdAndUpdate(req.user.id, filtterBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    date: {
      user: updateUser
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined! please use /signup instead'
  });
};

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
//do not update passwords with this
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.DeleteOne(User);
