'use strict';

var Hapi  = require('hapi');

var internals = {};

// perform health check logic
internals.checkHealth = function (callback) {
  return callback(null, {ok: true});
};

internals.index = {

  handler: function () {

    return function (request, reply) {
      internals.checkHealth(function (err) {
        if(err) {
          return reply(Hapi.error.internal('healh check failed', err));
        } else {
          return reply('OK').type('text/plain').code(200);
        }

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
