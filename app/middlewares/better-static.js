const static = require('koa-static');

module.exports = function (app, options) {
  return static(options.path);;
};
