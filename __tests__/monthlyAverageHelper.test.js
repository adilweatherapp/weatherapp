'use strict';
const handler = require('../helper/monthlyAverageHelper');

test('Monthly Average Helper Test', () => {
  expect(handler.beautifier('January', 'Netherlands', 'Amsterdam', 6, 1)).toEqual(
    expect.objectContaining({
      city: 'Amsterdam',
      country: 'Netherlands',
      highest_temperature: 6,
      lowest_temperature: 1,
      month: 'January',
    })
  );
});
