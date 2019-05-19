var test = require('unit.js');
var routesearch = require('../routesearch.js');

describe('routesearch test', function() {
  it('verifies successful response of routesearch.get', function(done) {
    routesearch.get({ /* event */ }, { /* context */ }, (err, result) => {
      try {
        test.number(result.statusCode).is(200);
        test.string(result.body).contains('Filter columns');
        test.value(result).hasHeader('content-type', 'text/html');
        done();
      } catch(error) {
        done(error);
      }
    });
  });
});
