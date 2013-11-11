'use strict';

var sinon   = require('sinon'),
    winston = require('winston'),
    Hoek    = require('hoek'),
    nconf   = require('nconf'),
    service = require('../index');

exports.logger = function () {
  return new winston.Logger({});
};

exports.mockRequest = function (params) {
  params = params || {};
  var stub = sinon.stub();
  var request = Hoek.merge({reply: stub}, params);

  return request;
};

exports.mockResponse = function () {
  var spy = sinon.stub();
  var response = {code: spy};

  return response;
};

exports.mockLogger = function () {
  return {log: sinon.log};
};

exports.service = function () {
  nconf.file(__dirname + '/../config/testing.json');

  return service(nconf);
};
