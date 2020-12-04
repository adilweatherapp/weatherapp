'use strict';
const handler = require('../helper/currentWeatherHelper.js');

test('Current Weather Helper Test', () => {
  const testObj = {
    location: {
      name: 'London',
      country: 'United Kingdom',
    },
    current: {
      wind_dir: 'N',
      temp_c: 2,
      temp_f: 3,
      wind_kph: 4,
      wind_mph: 5,
      humidity: 6.5,
      feelslike_c: 7,
      condition: {
        text: 'Windy',
      },
    },
  };

  expect(handler.beautifier(testObj)).toEqual(
    expect.objectContaining({
      condition: 'Windy',
      country: 'United kingdom',
      feelslike_c: 7,
      humidity: 6.5,
      name: 'London',
      temperature: 2,
      temperature_fahrenheit: 3,
      wind_direction: 'North',
      wind_speed_kph: 4,
      wind_speed_mph: 5,
    })
  );
});
