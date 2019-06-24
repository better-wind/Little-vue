/**
 * 扩展 Koa Context 对象
 */
module.exports = {
  userAgent() {
    return this.headers['user-agent'];
  },
};
