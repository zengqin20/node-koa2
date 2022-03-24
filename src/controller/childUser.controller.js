const { getSession } = require("../request/weixin");
const jwt = require("jsonwebtoken");
const {
  findInfo,
  createInfo,
  updateBindInfo,
  updateSyncInfo,
} = require("../database/util");
const { secretKey } = require("../utils/common");
const { verifyToken } = require("../utils/index");

async function syncParentMessage(parentId, address) {
  //查询表中是否有parentId
  const findRes = await findInfo("SyncAddress", { parentId });
  let res;

  if (findRes) {
    //更新数据库
    res = await updateSyncInfo(parentId, address);
  } else {
    //新建
    res = await createInfo("SyncAddress", {
      parentId,
      address,
    });
  }
}

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
        parentId,
        nickName,
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

    ctx.body = {
      isBind: Boolean(dbRes),
      nickName: dbRes.nickName,
    };
  }

  //查询同步信息
  async getSyncMessage(ctx, next) {
    //解析token
    const token = ctx.request.header.authorization.match(/(?<=\s).+$/g)[0];
    const openId = verifyToken(token);

    const dbRes = await findInfo("BindUser", {
      childId: openId,
      nickName: "爸爸",
    });
    // 查询nickName和childId对上的唯一地址

    ctx.body = {
      isAddress: Boolean(dbRes) && Boolean(dbRes.address),
      address: dbRes?.address,
    };
  }

  //更新同步信息
  async handleSync(ctx, next) {
    const { address } = ctx.request.body;
    //解析出用户openId
    const token = ctx.request.header.authorization.match(/(?<=\s).+$/g)[0];
    const openId = verifyToken(token);

    //查询绑定表信息
    const dbRes = await findInfo("BindUser", {
      childId: openId,
      nickName: "爸爸",
    });

    let isBind = false;
    //获取对应openID
    if (dbRes) {
      const res = await updateBindInfo({
        childId: openId,
        address,
      });
      // 更新完成之后，更新父母同步信息表
      syncParentMessage(dbRes.parentId, address);

      ctx.body = {
        addAddress: res,
      };
    }
  }
}
module.exports = new childUserController();
