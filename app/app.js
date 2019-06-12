const chalk = require('./common/chalk');
const path = require('path');
const fs = require('fs');
const Koa = require('koa');
const static = require('koa-static');
const route = require('koa-route');
const views = require('koa-views')
const app = new Koa();

// route logger
app.use(async (ctx, next) => {
  chalk.info('route', ctx.originalUrl)
  return next();
})

// static
app.use(static(path.join( __dirname, '../client')))

// views
app.use(views(path.join(__dirname, '/views')));

const dashboard = async (ctx) => {
  await ctx.render('/dashboard.html');
};

app.use(route['get']('/dashboard', dashboard));

app.listen(3000, ()=> {
  chalk.info('start', 'start dev 3000')
});
