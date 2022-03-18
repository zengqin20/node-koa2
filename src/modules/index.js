//模型对象
const mongoose = require("mongoose");

//1. 系统用户模型对象  设计表结构
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  openId: {
    type: String,
    required: true,
  },
});
//创建用户表
const User = mongoose.model("User", schema);

module.exports = {
  User,
};
