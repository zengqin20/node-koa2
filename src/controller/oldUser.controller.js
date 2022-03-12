class oldUserController {
  async besideBus(ctx, next) {
    ctx.body = "hello beside";
  }
}

module.exports = new oldUserController();
