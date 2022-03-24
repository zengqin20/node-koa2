//引入表
const models = require("../modules");

//精确查找
exports.findInfo = async (collection, query) => {
  const res = await models[collection].find(query);

  return res.length ? res[0] : false;
};

//新增
exports.createInfo = async (collection, data) => {
  const res = await models[collection].create(data);
  if (res) {
    return true;
  }
};

//更新Route表
exports.updateInfo = async (data) => {
  const { openId, route, homeRoute } = data;

  //更新哪个键值
  const res = await models.Route.findOneAndUpdate(
    {
      openId,
    },
    {
      $set: homeRoute ? { homeRoute } : { route },
    },
    {},
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        return data;
      }
    }
  ).clone();

  //返回的是添加成功后的数组

  return res ? true : false;
};

//更新bindUser表
exports.updateBindInfo = async (data) => {
  const { childId, address } = data;

  //更新哪个键值
  const res = await models.BindUser.findOneAndUpdate(
    {
      childId,
    },
    {
      $set: { address },
    },
    {},
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        return data;
      }
    }
  ).clone();

  return res ? true : false;
};

//更新SyncAddress表
exports.updateSyncInfo = async (parentId, address) => {
  //更新哪个键值
  const res = await models.SyncAddress.findOneAndUpdate(
    {
      parentId,
    },
    {
      $set: { address },
    },
    {},
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        return data;
      }
    }
  ).clone();

  return res ? true : false;
};
