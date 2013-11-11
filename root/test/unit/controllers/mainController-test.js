'use strict';

var chai           = require('chai'),
    sinon          = require('sinon'),
    _              = require('lodash'),
    helper         = require('../../test-helper'),
    mainController = require('../../../lib/controllers/mainController');

chai.should();

describe('Main Controller', function() {
  var controller,
      accounts;

  beforeEach(function () {
    accounts = {find: sinon.stub()};
    controller = mainController(accounts, helper.mockLogger());
  });

  describe('#index', function () {

    it('should reply with 3 accounts', function (done) {
      var request = helper.mockRequest();

      accounts.find.yields(null, _.range(10));

      var reply = function (resp) {
        resp.accounts.should.have.length(10);
        resp.found.should.equal(10);
        return done();
      };

      controller.index.handler(request, reply);
    });

  });
});
