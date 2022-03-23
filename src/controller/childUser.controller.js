const { getSession } = require("../request/weixin");
const jwt = require("jsonwebtoken");
const { findInfo, createInfo } = require("../database/util");
const { secretKey } = require("../utils/common");

class childUserController {
  //绑定用户

  async handleBind(ctx, next) {
    const { phone, name } = ctx.request.body;

    return;
  }
}
module.exports = new childUserController();
