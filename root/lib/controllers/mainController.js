'use strict';

var Hapi  = require('hapi'),
    convertParams = require('convert-params');

var internals = {};

var S = Hapi.types.String;
var N = Hapi.types.Number;

internals.index = {
  validate: {
    query : {
      name: S(),
      limit: N().max(3)
    }
  },

  handler: function (accounts, logger) {

    return function (request, reply) {
      var options = convertParams(request.query, internals.index.validate.query);
      logger.log('info', '[ %s ] called with', request.id, options);

      accounts.find(function (err, data) {
        var result;

        if(err) {
          result = Hapi.error.internal('Failed to find records', err);
        } else {
          result = {accounts: data, found : data.length};
        }

        reply(result);
      });
    };
  }
};

module.exports = function (accounts, logger) {
  var result = {
    index : {
      handler  : internals.index.handler(accounts, logger),
      validate : internals.index.validate
    }
  };

  return result;
};
