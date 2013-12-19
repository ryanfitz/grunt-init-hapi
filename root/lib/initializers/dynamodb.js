'use strict';

var http  = require('http'),
    https = require('https'),
    _     = require('lodash');

module.exports = function(AWS, dynamodbConfig) {
  http.globalAgent.maxSockets = Infinity;
  https.globalAgent.maxSockets = Infinity;

  var options = { apiVersion: '2012-08-10' };

  var dynamodb = new AWS.DynamoDB(_.merge({}, options, dynamodbConfig));

  return dynamodb;
};
