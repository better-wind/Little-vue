const chalk = require('../chalk');

module.exports = function(app) {
  return (ctx, next) => {
    chalk.info('route', ctx.originalUrl)
    return next();
  }
}
