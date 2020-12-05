'use strict';
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
    default: () => Date.now(),
  },
  wind_direction: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
    integer: true,
  },
  temperature_fahrenheit: {
    type: Number,
    required: true,
    integer: true,
  },
  wind_speed_kph: {
    type: Number,
    required: true,
    integer: true,
  },
  wind_speed_mph: {
    type: Number,
    required: true,
    integer: true,
  },
  humidity: {
    type: Number,
    required: true,
    integer: true,
  },
  feelslike_c: {
    type: Number,
    required: true,
    integer: true,
  },
});

schema.index({ created_at_: -1, name: -1 });

const model = mongoose.model('Weather', schema);

module.exports = model;
