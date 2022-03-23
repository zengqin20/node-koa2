const { getSession } = require("../request/weixin");
const jwt = require("jsonwebtoken");
const { findInfo, createInfo } = require("../database/util");
const { secretKey } = require("../utils/common");
const { verifyToken } = require("../utils/index");

class childUserController {
  //绑定用户

  async handleBind(ctx, next) {
    const { phone, name, nickName } = ctx.request.body;
    //解析出用户openId
    const token = ctx.request.header.authorization.match(/(?<=\s).+$/g)[0];
    const openId = verifyToken(token);

    //查询父母表信息
    const dbRes = await findInfo("User", { phone, name });

    let isBind = false;
    //获取对应openID
    if (dbRes) {
      const parentId = dbRes.openId;
      //存入关联用户表
      const res = await createInfo("BindUser", {
        childId: openId,
        parentId: {
          id: parentId,
          nickName,
        },
      });
      isBind = res;
    } else {
    }
    ctx.body = {
      isBind,
    };
  }

  async getBindMessage(ctx, next) {
    //解析token
    const token = ctx.request.header.authorization.match(/(?<=\s).+$/g)[0];
    const openId = verifyToken(token);

    const dbRes = await findInfo("BindUser", { childId: openId });
    if (dbRes) {
      ctx.body = {
        isBind: true,
        nickName: dbRes.parentId.nickName,
      };
    }
  }
}
module.exports = new childUserController();
