const views = require('koa-views');

module.exports = function (app, options) {
  return views(options.path, {
    map: {
      html: 'nunjucks'
    }
  });
};
