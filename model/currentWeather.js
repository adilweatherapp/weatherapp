'use strict';
const mongoose = require('mongoose');

const model = mongoose.model('Weather', {
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

module.exports = model;
