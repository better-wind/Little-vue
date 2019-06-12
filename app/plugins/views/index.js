module.exports = function() {
  if (ctx.render) return next();
  // ctx.response.render
  ctx.render = '2';
  return next();
}
