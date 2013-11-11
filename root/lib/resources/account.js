'use strict';

var internals = {};

internals.accounts = [
  {name: 'Bob', age: 22},
  {name: 'Joe', age: 33},
  {name: 'Marry', age: 44}
];

exports.find = function (callback) {
  process.nextTick(function () {
    return callback(null, internals.accounts);
  });
};
