const mongoose = require('mongoose');
const schemas = require('require-directory')(module);

const models = Object.keys(schemas).reduce((accumulator, key) => {
  accumulator[key] = mongoose.model(key, schemas[key]);
  return accumulator;
}, {});

module.exports = models;
