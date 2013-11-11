'use strict';

module.exports =  function (server, subscribers, logger) {
  var options = {
    broadcastInterval: 5000,
    subscribers: subscribers
  };

  server.pack.require('good', options, function (err) {
    if (err) {
      logger.log('error', 'failed to load monitoring plugin', err);
      return;
    }
  });

};
