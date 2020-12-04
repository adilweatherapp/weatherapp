'use strict';
exports.getConnectionString = function () {
  const mongoString = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;
  return mongoString;
};

exports.errorResponse = (message) => ({
  statusCode: 500,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ status: 'error', message }),
});

exports.getMonthFromString = (month) => {
  return new Date(Date.parse(`${month} 1, 2020`)).getMonth();
};

exports.strBeautifier = (s) => {
  const str = s.toLowerCase().replace('-', ' ');
  return str.charAt(0).toUpperCase() + str.slice(1);
};
