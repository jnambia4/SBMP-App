'use strict';

var test = require('unit.js');
var index = require('../src/index.js');

describe('index test', function() {
  it('verifies successful response of index.get', function(done) {
    index.get({ /* event */ }, { /* context */ }, (err, result) => {
      try {
        test.number(result.statusCode).is(200);
        test.string(result.body).contains('Welcome');
        test.value(result).hasHeader('content-type', 'text/html');
        done();
      } catch(error) {
        done(error);
      }
    });
  });
});
