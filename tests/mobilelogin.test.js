var test = require('unit.js');
var index = require('../src/mobilelogin.js');

describe('mobilelogin test', function() {
  it('verifies successful response of mobilelogin.get', function(done) {
    index.get({ /* event */ }, { /* context */ }, (err, result) => {
      try {
        test.number(result.statusCode).is(200);
        test.string(result.body).contains('Logging In');
        test.value(result).hasHeader('content-type', 'text/html');
        done();
      } catch(error) {
        done(error);
      }
    });
  });
});
