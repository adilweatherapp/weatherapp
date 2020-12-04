'use strict';
const handler = require('../helper/commonHelper.js');

test('error response test', () => {
  expect(handler.errorResponse('test here')).toEqual({
    statusCode: 500,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'error', message: 'test here' }),
  });
});
