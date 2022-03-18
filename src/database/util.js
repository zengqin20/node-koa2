//引入表
const models = require("../modules");

//精确查找
exports.findInfo = async (query) => {
  const res = await models.User.find(query);

  return res.length ? res[0] : false;
};

//新增
exports.createInfo = async (data) => {
  const existence = await this.findInfo({ openId: data.openId });

  if (existence) {
    return false;
  }

  const res = await models.User.create(data);
  if (res) {
    return true;
  }
};
