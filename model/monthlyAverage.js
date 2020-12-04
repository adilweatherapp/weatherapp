'use strict';
const mongoose = require('mongoose');

const model = mongoose.model('MonthlyAverage', {
  month: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  highest_temperature: {
    type: Number,
    required: true,
    integer: true,
  },
  lowest_temperature: {
    type: Number,
    required: true,
    integer: true,
  },
  created_at: {
    type: Date,
    required: true,
    default: () => Date.now(),
  },
});

module.exports = model;
