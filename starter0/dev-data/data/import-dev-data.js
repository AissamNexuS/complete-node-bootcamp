const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('../../models/tourmodel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('db connection successfully '));

// read json file
const tour = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// import data to dababase
const importData = async () => {
  try {
    await Tour.create(tour);
    console.log('data successfully imported');
  } catch (err) {
    console.log('==========>', err);
  }
};

// delete all data
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('data successfully deleted');
  } catch (err) {
    console.log('==========>', err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
