'use strict';
const mockingoose = require('mockingoose').default;

const model = require('../model/monthlyAverage.js');

describe('test mongoose monthlyAverageModel', () => {
  it('should return the doc with findById', () => {
    const _doc = {
      _id: '507f191e810c19729de860ea',
      month: 'January',
      country: 'Turkey',
      city: 'Ankara',
      highest_temperature: 10,
      lowest_temperature: 1,
      created_at: '2020-12-04T16:18:52.154Z',
    };

    mockingoose(model).toReturn(_doc, 'findOne');

    return model.findById({ _id: '507f191e810c19729de860ea' }).then((doc) => {
      expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
    });
  });

  it('monthlyAverageModel with update function', () => {
    const _doc = {
      _id: '507f191e810c19729de860ea',
      month: 'January',
      country: 'Turkey',
      city: 'Ankara',
      highest_temperature: 10,
      lowest_temperature: 1,
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
