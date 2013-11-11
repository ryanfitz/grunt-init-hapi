'use strict';

var chai           = require('chai'),
    helper         = require('../test-helper');

chai.should();

describe('Main Controller', function() {
  var service,
      server;

  before(function () {
    service = helper.service();
    server = service.server;
  });

  describe('`GET` /{%= name %}', function () {

    it('should respond with 200 OK', function (done) {

      server.inject('/{%= name %}', function (res) {
        res.statusCode.should.equal(200);

        return done();
      });

    });

  });
});
