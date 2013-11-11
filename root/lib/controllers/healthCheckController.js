'use strict';

var Hapi  = require('hapi');

var internals = {};

// perform health check logic
internals.checkHealth = function (callback) {
  return callback(null, {ok: true});
};

internals.index = {

  handler: function () {

    return function (request) {
      internals.checkHealth(function (err) {
        var result;

        if(err) {
          result = Hapi.error.internal('healh check failed', err);
        } else {
          result = new Hapi.response.Empty();
          result.code(200);
        }

        request.reply(result);
      });
    };
  }
};

module.exports = function () {
  var result = {
    index : {
      handler  : internals.index.handler()
    }
  };

  return result;
};
