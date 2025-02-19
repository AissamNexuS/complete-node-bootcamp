const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const app = require('./app');

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
  // eslint-disable-next-line
  .then(() => console.log('db connection successfully '));

//========================================================
const port = process.env.PORT || 8080;
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`app listening on port ${port}`);
});
