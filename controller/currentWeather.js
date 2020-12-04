'use strict';
const mongoose = require('mongoose');
const Promise = require('bluebird');
const fetch = require('node-fetch');
const weatherModel = require('../model/currentWeather.js');
const currentWeatherHelper = require('../helper/currentWeatherHelper.js');
const commonHelper = require('../helper/commonHelper.js');

mongoose.Promise = Promise;

module.exports.index = (event, context, callback) => {
  const oneMinAgo = new Date(Date.now() - 1000 * 60 * 1);

  const location = commonHelper.strBeautifier(event.pathParameters.location);

  mongoose.connect(
    commonHelper.getConnectionString(),
    { useNewUrlParser: true, useUnifiedTopology: true },
    (mongooseErr) => {
      if (mongooseErr) {
        callback(null, commonHelper.errorResponse(mongooseErr.message));
      } else {
        weatherModel.findOne(
          {
            $and: [
              {
                created_at: {
                  $gte: oneMinAgo,
                  $lte: new Date(),
                },
              },
              { name: location },
            ],
          },
          (findErr, data) => {
            if (findErr) {
              mongoose.connection.close();
              callback(null, commonHelper.errorResponse(findErr.message));
            } else if (data !== null) {
              mongoose.connection.close();
              callback(null, { statusCode: 200, body: JSON.stringify(data) });
            } else {
              fetch(
                `https://api.weatherapi.com/v1/current.json?key=${process.env.CURRENT_WEATHER_API_KEY}&q=${location}`
              )
                .then((response) =>
                  response.json().catch((err) => {
                    mongoose.connection.close();
                    callback(null, commonHelper.errorResponse(err.message));
                  })
                )
                .then((json) => {
                  if (Object.prototype.hasOwnProperty.call(json, 'error')) {
                    mongoose.connection.close();
                    callback(null, commonHelper.errorResponse(json.error.message));
                  } else {
                    const weatherObj = currentWeatherHelper.beautifier(json);
                    weatherObj
                      .save()
                      .then(() => {
                        mongoose.connection.close();
                        callback(null, { statusCode: 200, body: JSON.stringify(weatherObj) });
                      })
                      .catch((err) => {
                        mongoose.connection.close();
                        callback(null, commonHelper.errorResponse(err.message));
                      });
                  }
                })
                .catch((err) => {
                  mongoose.connection.close();
                  callback(null, commonHelper.errorResponse(err.message));
                });
            }
          }
        );
      }
    }
  );
};
