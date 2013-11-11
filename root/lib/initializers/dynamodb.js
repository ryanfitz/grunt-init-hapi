'use strict';

var http = require('http'),
    https = require('https');

module.exports = function(AWS) {
  http.globalAgent.maxSockets = Infinity;
  https.globalAgent.maxSockets = Infinity;

  var dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

  return dynamodb;
};
