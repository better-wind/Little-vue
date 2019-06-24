const glob = require('fast-glob');
const path = require('path');
const _ = require('lodash');
const contextProto = require('koa/lib/context');

class Loader {
  get defaultPatterns() {
    return {
      // ctx 拓展
      context: `/app/extends/context.js`,
      // 应用层
      controller: '/app/controllers/**/*.js',
      service: '/app/services/**/*.js',
      router: '/app/routers/**/*.js',
      // 中间件
      middleware: '/app/middlewares/**/*.js',
      // 中间间配置
      middlewareConfig: 'config/middleware.default.js',
      // 插件配置
      pluginConfig: 'config/plugin.default.js',

    }
  }

  constructor(options = {}) {
    this.options = options;
    this.root = this.options.root;
    this.app = this.options.app;
    this.better = this.options.better;
    this.patterns = Object.assign({}, this.defaultPatterns, options.patterns);

    this.init();
  }

  init() {
    this.loadDirs(this.root);

    this.loadExtend(this.patterns.context, contextProto);

    this.loadControllers();
    this.loadRouters();

    this.loadMiddlewareConfig();
    this.loadMiddleware();
    this.useMiddleware();
  }

  loadDirs(root) {
    let dirs = [{
      baseDir: root,
      type: 'app',
      name: path.basename(root)
    }];
    dirs = dirs.concat(this.getPluginDirs(root));
    let proto = this.better;
    while (proto) {
      proto = Object.getPrototypeOf(proto);
      if (proto) {
        const newRoot = proto[Symbol.for('BASE_DIR')];
        if (newRoot) {
          dirs.push({
            baseDir: newRoot,
            type: 'framework',
            name: path.basename(newRoot)
          });
          dirs = dirs.concat(this.getPluginDirs(newRoot));
        }
      }
    }
    dirs = dirs.reverse();
    this.dirs = dirs;
  }

  getPluginDirs(root) {
    const entries = glob.sync([ path.join(root, this.patterns.pluginConfig) ], {
      dot: true
    })
    const config = entries.reduce((c, item) => {
      return _.merge(c, require(item));
    }, {})
    let list = [];
    Object.keys(config).forEach(key => {
      let pluginConfig = config[key];
      if (pluginConfig.enable) {
        list.push({
          baseDir: pluginConfig.path,
          type: 'plugin',
          name: path.basename(pluginConfig.path)
        });
      }
    });

    return list;
  }

  loadExtend(patterns, proto) {
    this.globDirs(patterns, entries => {
      entries.forEach(entry => {
        const methods = require(entry);
        const descriptors = Object.keys(methods).reduce((descriptors, key) => {
          descriptors[key] = Object.getOwnPropertyDescriptor(methods, key);
          return descriptors;
        }, {});

        Object.defineProperties(proto, descriptors);
      })
    })
  }

  loadControllers() {
    let controllers = {};
    const entries = glob.sync([ path.join(this.root, this.patterns.controller) ], {
      dot: true
    });
    entries.forEach(entry => {
      let key = entry.split('controllers/')[1];
      key = key.replace('.js', '');
      key = key.replace('/', '.');
      controllers[key] = require(entry);
    });

    this.app.controllers = controllers;
  }

  loadRouters() {
    let routers = [];
    const entries = glob.sync([ path.join(this.root,this.patterns.router) ], {
      dot: true
    });
    entries.forEach(entry => {
      routers = routers.concat(require(entry));
    });
    this.app.routers = routers;
  }

  loadMiddlewareConfig() {
    let config = {};
    this.globDirs(this.patterns.middlewareConfig, entries => {
      entries.forEach(entry => {
        config = _.merge(config, require(entry));
      })
    })
    this.app.middlewaresConfig = config;
  }

  loadMiddleware() {
    let middleware = {};
    this.globDirs(this.patterns.middleware, (entries) => {
      entries.forEach(entry => {
        let key = path.basename(entry);
        key = key.replace('.js', '');
        middleware[key] = require(entry);
      })
    });
    this.app.middlewares = middleware;
  }

  useMiddleware() {
    const app = this.app;
    const middlewares = app.middlewares;
    const middlewaresConfig = app.middlewaresConfig;
    Object.keys(middlewaresConfig).forEach(key => {
      const config = middlewaresConfig[key] || {};
      const middleware = middlewares[key];
      if (config.enable && middleware) {
        app.use(middlewares[key](app, config.options));
      }
    })
  }

  globDirs(patterns, callback) {
    this.dirs.forEach(item => {
      const entries = glob.sync([path.join(item.baseDir, patterns)], { dot: true });
      callback(entries);
    });
  }
}

module.exports = Loader;
