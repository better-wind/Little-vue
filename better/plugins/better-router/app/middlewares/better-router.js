const KoaRouter = require('koa-router');

function toArray(arr) {
  return Array.isArray(arr) ? arr : [arr];
}

module.exports = function (app) {
  const koaRouter = new KoaRouter();
  const routers = app.routers;
  const controllers = app.controllers;
  const newRouters = [];
  routers.forEach(route => {
    newRouters.push({
      verb: route[0].toLowerCase(),
      path: toArray(route[1]),
      controller: controllers[route[2]],
      methods: toArray(route[3]),
    })
  })

  newRouters.forEach(route => {
    route.path.forEach(path => {
      koaRouter[route.verb](path, async (ctx, next) => {
        const ControllerClass = route.controller;
        const controller = new ControllerClass(ctx);
        if (ControllerClass.prototype.init) {
          await controller.init(ctx);
        }

        for (let i = 0;i <= route.methods.length - 1; i++) {
          const method = route.methods[i];
          await controller[method](ctx, next);
        }
      })
    })
  })
  return koaRouter.routes();
}
