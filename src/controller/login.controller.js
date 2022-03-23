const { getSession } = require("../request/weixin");
const jwt = require("jsonwebtoken");
const { findInfo, createInfo } = require("../database/util");
const { secretKey } = require("../utils/common");

class loginController {
  //获取token

  async getTokenKey(ctx, next) {
    const code = ctx.request.body.code;
    const type = ctx.request.body?.type;

    let res = await getSession(code);
    res = JSON.parse(res);

    //查询不同数据库是否有openId用户信息
    let dbRes;
    if (!type) {
      console.log(1);
      const userRes = await findInfo("User", { openId: res.openid });
      const childRes = await findInfo("Child", { openId: res.openid });

      dbRes = userRes || childRes;
    } else {
      const collectionName = type === "parent" ? "User" : "Child";
      dbRes = await findInfo(collectionName, { openId: res.openid });
    }

    //查询数据库结果
    let token = "";
    let userType = "";

    //查询结果存在
    if (dbRes) {
      // 生成token;
      token = jwt.sign(res, secretKey);
      //返回用户类型
      userType = dbRes.type;
    }

    ctx.body = {
      token,
      openId: res.openid,
      type: userType,
    };
  }

  async handleRegister(ctx, next) {
    const data = ctx.request.body;
    //分角色存储
    const collectionName = data.type === "parent" ? "User" : "Child";

    //存入数据库 唯一标识openId
    const res = await createInfo(collectionName, data);

    ctx.body = {
      session: res,
      sessionType: data.type,
    };
  }
}

module.exports = new loginController();
