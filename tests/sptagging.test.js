var test = require('unit.js');
var sptagging = require('../sptagging.js');

describe('sptagging test', function() {
  it('verifies successful response of sptagging.get', function(done) {
    sptagging.get({ /* event */ }, { /* context */ }, (err, result) => {
      try {
        test.number(result.statusCode).is(200);
        test.string(result.body).contains('Service Providers');
        test.value(result).hasHeader('content-type', 'text/html');
        done();
      } catch(error) {
        done(error);
      }
    });
  });
});
