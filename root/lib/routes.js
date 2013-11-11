'use strict';

module.exports = function(mainController, healthCheckController) {
  return [

    { method: 'GET' , path: '/{%= name %}' , config: mainController.index },
    { method: 'GET' , path: '/_health'     , config: healthCheckController.index }

  ];
};
