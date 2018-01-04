const mongoose = require('mongoose');

mongoose.Promise = Promise;

mongoose.connection.on('error', (err) => {
  console.error(`db error: ${err}`);
});

mongoose.connection.on('open', (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`db connected`);
  }
});

const connection = mongoose.connect('mongodb://localhost/dmx-sample-server');

module.exports = { connection };
