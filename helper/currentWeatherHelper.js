'use strict';
const CurrentWeatherModel = require('../model/currentWeather.js');
const commonHelper = require('../helper/commonHelper.js');

exports.beautifier = function (original) {
  const currentWeather = new CurrentWeatherModel({
    name: commonHelper.strBeautifier(original.location.name),
    country: commonHelper.strBeautifier(original.location.country),
    condition: original.current.condition.text || '',
    wind_direction: windDirectionReplacer(original.current.wind_dir),
    temperature: Number(original.current.temp_c),
    temperature_fahrenheit: Number(original.current.temp_f),
    wind_speed_kph: Number(original.current.wind_kph),
    wind_speed_mph: Number(original.current.wind_mph),
    humidity: Number(original.current.humidity),
    feelslike_c: Number(original.current.feelslike_c),
  });

  if (currentWeather.validateSync()) {
    return 'validation error';
  }

  return currentWeather;
};

function windDirectionReplacer(direction) {
  const directions = {
    N: 'North',
    E: 'East',
    S: 'South',
    W: 'West',

    NE: 'Northeast',
    SE: 'southeast',
    SW: 'southwest',
    NW: 'northwest',

    NNE: 'North-Northeast',
    ENE: 'East-Northeast',
    ESE: 'East-Southeast',
    SSE: 'South-Southeast',
    SSW: 'South-Southwest',
    WSW: 'West-Southwest',
    WNW: 'West-Northwest',
    NNW: 'North-Northwest',
  };

  return directions[direction] || direction;
}
