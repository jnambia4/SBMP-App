var test = require('unit.js');
var profilemgmt = require('../src/profilemgmt.js');

describe('profilemgmt test', function() {
  it('verifies successful response of profilemgmt.get', function(done) {
    profilemgmt.get({ /* event */ }, { /* context */ }, (err, result) => {
      try {
        test.number(result.statusCode).is(200);
        test.string(result.body).contains('User Profile');
        test.value(result).hasHeader('content-type', 'text/html');
        done();
      } catch(error) {
        done(error);
      }
    });
  });
});
