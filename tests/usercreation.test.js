var test = require('unit.js');
var index = require('../src/usercreation.js');

describe('usercreation test', function() {
  it('verifies successful response of usercreation.get', function(done) {
    index.get({ /* event */ }, { /* context */ }, (err, result) => {
      try {
        test.number(result.statusCode).is(200);
        test.string(result.body).contains('Loading');
        test.value(result).hasHeader('content-type', 'text/html');
        done();
      } catch(error) {
        done(error);
      }
    });
  });
});
