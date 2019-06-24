class DashBoardController {
  async init(ctx) {
    console.log('init');
  }

  async setTitle(ctx) {
    ctx.state.title = 'dashboard';
    console.log(ctx.userAgent());
  }

  async getIndexHtml(ctx) {
    await ctx.render('dashboard.html');
  }
}

module.exports = DashBoardController;
