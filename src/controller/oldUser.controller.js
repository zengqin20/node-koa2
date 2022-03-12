const getBeside = require("../request");
class oldUserController {
  async besideBus(ctx, next) {
    const params = ctx.url.match(/\d+.\d+/g);
    console.log(params);
    const lat = params[0];
    const lng = params[1];

    const res = await getBeside(lat, lng);
    ctx.body = res;
  }
}

module.exports = new oldUserController();
