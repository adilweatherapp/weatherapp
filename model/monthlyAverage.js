'use strict';
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
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

schema.index({ created_at_: -1, country: 1, month: 1, city: 1 });

const model = mongoose.model('MonthlyAverage', schema);

module.exports = model;
