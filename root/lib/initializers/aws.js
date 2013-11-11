'use strict';

var AWS = require('aws-sdk');

module.exports = function (credentials) {
  // credials aren't required when using an iam role
  if(credentials) {
    AWS.config.update({
      accessKeyId     : credentials.accessKeyId,
      secretAccessKey : credentials.secretAccessKey,
      region          : credentials.region
    });
  }

  AWS.config.apiVersions = {
    dynamodb: '2012-08-10'
  };

  return AWS;
};
