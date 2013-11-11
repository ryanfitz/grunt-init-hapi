'use strict';

var chai           = require('chai'),
    account        = require('../../../lib/resources/account');

chai.should();

describe('Account', function() {

  describe('#find', function () {

    it('should find three accounts', function (done) {

      account.find(function (err, data) {
        data.should.have.length(3);

        return done();
      });

    });

  });
});
