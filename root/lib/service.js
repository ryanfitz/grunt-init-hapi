'use strict';

var Hapi    = require('hapi'),
    Hoek    = require('hoek'),
    di      = require('di'),
    routes  = require('./routes');

Hapi.joi.version('v2');

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
    credentials           : ['value'   , config.get('aws')],
    dynamodbConfig        : ['value'   , config.get('dynamodb')],
    metricsEnabled        : ['value'   , config.get('metrics')],
    subscribers           : ['value'   , config.get('monitoring:subscribers')],
    accounts              : ['value'   , resources.Account],
    serverConfig          : ['factory' , internals.serverConfig],
    server                : ['factory' , internals.createServer],
    logger                : ['factory' , initializers.Logging],
    monitoring            : ['factory' , initializers.Monitoring],
    metrics               : ['factory' , initializers.Metrics],
    AWS                   : ['factory' , initializers.Aws],
    dynamodb              : ['factory' , initializers.Dynamodb],
    mainController        : ['factory' , controllers.Maincontroller],
    healthCheckController : ['factory' , controllers.Healthcheckcontroller],
    routes                : ['factory' , routes],
    app                   : ['factory' , internals.createApp]
  }];

  var injector = new di.Injector(modules);

  var app = injector.get('app');
  app.injector = injector;

  return app;
};
