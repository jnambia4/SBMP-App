'use strict';

var test = require('unit.js');
var doc = require('../src/doc.js');

describe('doc test', function() {
  it('verifies successful response of doc.get', function(done) {
    doc.get({ /* event */ }, { /* context */ }, (err, result) => {
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
