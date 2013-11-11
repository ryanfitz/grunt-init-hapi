'use strict';

module.exports =  function (metricsEnabled, server, AWS, logger) {
  if(!metricsEnabled) {
    return;
  }

  var options = {
    namespace: '{%= name %}',
    frequency: 60000,
    AWS : AWS
  };

  server.pack.require('cloudstats', options, function (err) {
    if (err) {
      logger.log('error', 'failed to load cloudstats plugin', err);
      return;
    }
  });
};
