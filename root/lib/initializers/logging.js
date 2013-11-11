'use strict';

var winston = require('winston'),
    path    = require('path'),
    fs      = require('fs');

var internals = {};

internals.createLogginDir = function (filename) {
  var dir = path.dirname(filename);

  var exists = fs.existsSync(dir);

  if(!exists) {
    fs.mkdirSync(dir);
  }
};

internals.consoleTransport = function (logging) {
  return new winston.transports.Console({colorize: true, timestamp: true, level: logging.level});
};

internals.fileTransport = function (logging) {
  internals.createLogginDir(logging.file);
  return new winston.transports.File({colorize: true, filename: logging.file, level: logging.level });
};

module.exports = function (logging) {
  var options = {
    transports : []
  };

  if(logging.console) {
    options.transports.push(internals.consoleTransport(logging));
  }

  if(logging.file) {
    options.transports.push(internals.fileTransport(logging));
  }

  return new winston.Logger(options);
};
