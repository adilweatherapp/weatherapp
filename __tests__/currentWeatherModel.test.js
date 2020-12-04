'use strict';
const mockingoose = require('mockingoose').default;

const model = require('../model/currentWeather.js');

describe('test mongoose currentWeatherModel', () => {
  it('should return the doc with findById', () => {
    const _doc = {
      _id: '507f191e810c19729de860ea',
      name: 'Ankara',
      country: 'Turkey',
      wind_direction: 'N',
      condition: 'Cloudy',
      temperature: 10,
      temperature_fahrenheit: 32,
      wind_speed_kph: 10,
      wind_speed_mph: 100,
      humidity: 75,
      feelslike_c: 10.1,
      created_at: '2020-12-04T16:18:52.154Z',
    };

    mockingoose(model).toReturn(_doc, 'findOne');

    return model.findById({ _id: '507f191e810c19729de860ea' }).then((doc) => {
      expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
    });
  });

  it('currentWeatherModel with update function', () => {
    const _doc = {
      _id: '507f191e810c19729de860ea',
      name: 'Ankara',
      country: 'Turkey',
      wind_direction: 'N',
      condition: 'Cloudy',
      temperature: 10,
      temperature_fahrenheit: 32,
      wind_speed_kph: 10,
      wind_speed_mph: 100,
      humidity: 75,
      feelslike_c: 10.1,
      created_at: '2020-12-04T16:18:52.154Z',
    };

    mockingoose(model).toReturn(_doc, 'update');

    return model
      .update({ name: 'changed' }) // this won't really change anything
      .where({ _id: '507f191e810c19729de860ea' })
      .then((doc) => {
        expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
      });
  });
});
