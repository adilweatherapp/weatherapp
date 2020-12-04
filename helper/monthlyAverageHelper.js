'use strict';
const MonthlyAverageModel = require('../model/monthlyAverage.js');
const commonHelper = require('../helper/commonHelper.js');

exports.beautifier = function (month, country, city, highestTemperature, lowestTemperature) {
  const monthlyAverage = new MonthlyAverageModel({
    month: commonHelper.strBeautifier(month),
    country: commonHelper.strBeautifier(country),
    city: commonHelper.strBeautifier(city),
    highest_temperature: Number(highestTemperature),
    lowest_temperature: Number(lowestTemperature),
  });

  if (monthlyAverage.validateSync()) {
    return 'validation error';
  }

  return monthlyAverage;
};
