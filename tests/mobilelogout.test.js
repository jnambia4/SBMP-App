var test = require('unit.js');
var index = require('../src/mobilelogout.js');

describe('mobilelogout test', function() {
  it('verifies successful response of mobilelogout.get', function(done) {
    index.get({ /* event */ }, { /* context */ }, (err, result) => {
      try {
        test.number(result.statusCode).is(200);
        test.string(result.body).contains('Logout Successful');
        test.value(result).hasHeader('content-type', 'text/html');
        done();
      } catch(error) {
        done(error);
      }
    });
  });
});
