var test = require('unit.js');
var index = require('../src/homepage.js');

describe('homepage test', function() {
  it('verifies successful response of homepage.get', function(done) {
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
