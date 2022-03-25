const { getSession } = require("../request/weixin");
const jwt = require("jsonwebtoken");
const {
  findInfo,
  createInfo,
  updateBindInfo,
  updateSyncInfo,
  findInfos,
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

    const dbRes = await findInfos("BindUser", { childId: openId });

    //如果查询出两条数据，记得合并信息为数组
    const names = dbRes && dbRes.map((item) => item.nickName);

    ctx.body = {
      isBind: Boolean(dbRes),
      nickName: names,
    };
  }

  //查询同步信息
  async getSyncMessage(ctx, next) {
    //解析token
    const token = ctx.request.header.authorization.match(/(?<=\s).+$/g)[0];
    const openId = verifyToken(token);

    const dbRes = await findInfos("BindUser", {
      childId: openId,
    });

    const infos =
      dbRes &&
      dbRes.map((item) => {
        return { name: item.nickName, address: item.address };
      });

    ctx.body = {
      isAddress: dbRes,
      infos: infos || [],
    };
  }

  //更新同步信息
  async handleSync(ctx, next) {
    const { address, nickName } = ctx.request.body;
    //解析出用户openId
    const token = ctx.request.header.authorization.match(/(?<=\s).+$/g)[0];
    const openId = verifyToken(token);

    //查询绑定表信息
    const dbRes = await findInfo("BindUser", {
      childId: openId,
      nickName,
    });

    //获取对应openID
    if (dbRes) {
      const res = await updateBindInfo({
        nickName,
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
