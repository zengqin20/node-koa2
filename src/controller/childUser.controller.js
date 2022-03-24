const { getSession } = require("../request/weixin");
const jwt = require("jsonwebtoken");
const { findInfo, createInfo, updateBindInfo } = require("../database/util");
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

  //查询同步信息
  async getSyncMessage(ctx, next) {
    //解析token
    const token = ctx.request.header.authorization.match(/(?<=\s).+$/g)[0];
    const openId = verifyToken(token);

    const dbRes = await findInfo("BindUser", { childId: openId });

    //解析坐标
    // const lngRes = await getLng(dbRes?.address);
    // const lngLocation = JSON.parse(lngRes).result.location;

    ctx.body = {
      isAddress: Boolean(dbRes) && Boolean(dbRes.address),
      address: dbRes?.address,
      //   lngLocation,
    };
  }

  async handleSync(ctx, next) {
    const { address } = ctx.request.body;
    //解析出用户openId
    const token = ctx.request.header.authorization.match(/(?<=\s).+$/g)[0];
    const openId = verifyToken(token);

    //查询父母表信息
    const dbRes = await findInfo("BindUser", { childId: openId });

    let isBind = false;
    //获取对应openID
    if (dbRes) {
      const res = await updateBindInfo({
        childId: openId,
        address,
      });

      ctx.body = {
        addAddress: res,
      };
    }
  }
}
module.exports = new childUserController();
