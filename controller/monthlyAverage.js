'use strict';
const mongoose = require('mongoose');
const Promise = require('bluebird');
const fetch = require('node-fetch');
const monthlyAverageModel = require('../model/monthlyAverage.js');
const monthlyAverageHelper = require('../helper/monthlyAverageHelper.js');
const commonHelper = require('../helper/commonHelper.js');

mongoose.Promise = Promise;

module.exports.index = (event, context, callback) => {
  const oneMinAgo = new Date(Date.now() - 1000 * 60 * 1);
  let status;

  mongoose.connect(
    commonHelper.getConnectionString(),
    { useNewUrlParser: true, useUnifiedTopology: true },
    (mongooseErr) => {
      if (mongooseErr) {
        callback(null, commonHelper.errorResponse(mongooseErr.message));
      } else {
        monthlyAverageModel.findOne(
          {
            $and: [
              {
                created_at: {
                  $gte: oneMinAgo,
                  $lte: new Date(),
                },
              },
              {
                month: commonHelper.strBeautifier(event.pathParameters.month),
                country: commonHelper.strBeautifier(event.pathParameters.country),
                city: commonHelper.strBeautifier(event.pathParameters.city),
              },
            ],
          },
          (findErr, data) => {
            if (findErr) {
              callback(null, commonHelper.errorResponse(findErr.message));
            } else if (data !== null) {
              mongoose.connection.close();
              callback(null, { statusCode: 200, body: JSON.stringify(data) });
            } else {
              fetch(
                `https://www.timeanddate.com/weather/${event.pathParameters.country}/${event.pathParameters.city}/climate`
              )
                .then((response) => {
                  status = response.status;
                  return response.text();
                })
                .then((body) => {
                  if (status !== 200) {
                    mongoose.connection.close();
                    callback(null, commonHelper.errorResponse('The location not found'));
                  } else {
                    const re = new RegExp('var data=(.*);', 'gi');
                    const degrees = JSON.parse(re.exec(body)[1]);
                    const thatMonthDegree =
                      degrees.months[commonHelper.getMonthFromString(event.pathParameters.month)];

                    const monthlyAverage = monthlyAverageHelper.beautifier(
                      event.pathParameters.month,
                      event.pathParameters.country,
                      event.pathParameters.city,
                      thatMonthDegree.max,
                      thatMonthDegree.min
                    );
                    monthlyAverage
                      .save()
                      .then(() => {
                        mongoose.connection.close();
                        callback(null, { statusCode: 200, body: JSON.stringify(monthlyAverage) });
                      })
                      .catch((err) => {
                        mongoose.connection.close();
                        callback(null, commonHelper.errorResponse(err.message));
                      });
                  }
                });
            }
          }
        );
      }
    }
  );
};
