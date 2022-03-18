const { getSession } = require("../request/weixin");
const jwt = require("jsonwebtoken");
const { findInfo, createInfo } = require("../database/util");

class loginController {
  //获取token

  async getTokenKey(ctx, next) {
    const code = ctx.request.body.code;

    let res = await getSession(code);
    res = JSON.parse(res);

    //查询数据库是否有openId用户信息

    const dbRes = await findInfo({ openId: res.openid });

    let token = "";
    let type = "";

    //查询结果存在
    if (dbRes) {
      // 生成token;
      token = jwt.sign(res, "assas");
      //返回用户类型
      type = dbRes.type;
    }

    ctx.body = {
      token,
      openId: res.openid,
      type,
    };
  }

  async handleRegister(ctx, next) {
    const data = ctx.request.body;

    //存入数据库
    const res = await createInfo(data);

    ctx.body = {
      session: res,
    };
  }
}

module.exports = new loginController();
