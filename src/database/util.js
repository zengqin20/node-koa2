//引入表
const models = require("../modules");

//精确查找
exports.findInfo = async (collection, query) => {
  const res = await models[collection].find(query);

  return res.length ? res[0] : false;
};

//新增
exports.createInfo = async (collection, data) => {
  const existence = await this.findInfo(collection, { openId: data.openId });

  if (existence) {
    return false;
  }

  const res = await models[collection].create(data);
  if (res) {
    return true;
  }
};
