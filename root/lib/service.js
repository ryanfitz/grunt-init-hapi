'use strict';

var Hapi    = require('hapi'),
    Hoek    = require('hoek'),
    di      = require('di'),
    routes  = require('./routes');

var initializers = {},
    controllers = {},
    resources = {};

Hoek.loadDirModules(__dirname + '/initializers', [], initializers);
Hoek.loadDirModules(__dirname + '/controllers', [], controllers);
Hoek.loadDirModules(__dirname + '/resources', [], resources);

var internals = {};

internals.serverConfig = function (config) {
  return {
    timeout : {
      server : config.get('timeout')
    }
  };
};

internals.createServer = function (port, serverConfig, routes) {
  var server = Hapi.createServer(port, serverConfig);
  server.route(routes);

  return server;
};

internals.createApp = function (monitoring, metrics, routes, server, logger) {
  var app = {
    server : server,
    logger : logger
  };

  app.start = function (callback) {
    server.start(function () {
      return callback(server.info);
    });
  };

  return app;
};

module.exports = function(config) {
  var modules = [{
    config                : ['value'   , config],
    port                  : ['value'   , config.get('port')],
    logging               : ['value'   , config.get('logging')],
    apiURL                : ['value'   , config.get('api:url')],
    registryConfig        : ['value'   , config.get('registry')],
    credentials           : ['value'   , config.get('aws')],
    metricsEnabled        : ['value'   , config.get('metrics')],
    subscribers           : ['value'   , config.get('monitoring:subscribers')],
    accounts              : ['value'   , resources.Account],
    serverConfig          : ['factory' , internals.serverConfig],
    server                : ['factory' , internals.createServer],
    logger                : ['factory' , initializers.Logging],
    registry              : ['factory' , initializers.Registry],
    wantworthy            : ['factory' , initializers.Wantworthy],
    monitoring            : ['factory' , initializers.Monitoring],
    metrics               : ['factory' , initializers.Metrics],
    AWS                   : ['factory' , initializers.Aws],
    dynamodb              : ['factory' , initializers.dynamodb],
    mainController        : ['factory' , controllers.Maincontroller],
    healthCheckController : ['factory' , controllers.Healthcheckcontroller],
    routes                : ['factory' , routes],
    app                   : ['factory' , internals.createApp]
  }];

  var injector = new di.Injector(modules);

  return injector.get('app');
};
