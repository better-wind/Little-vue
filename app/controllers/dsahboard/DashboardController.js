class DashBoardController {
  async getIndexHtml(ctx) {
    return await ctx.render('dashboard.html');
  }
}
