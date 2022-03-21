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

//1. 创建常用路线信息
const routeSchema = new mongoose.Schema({
  route: {
    type: Array,
    required: false,
  },
  openId: {
    type: String,
    required: true,
  },
  homeroute: {
    type: Array,
    required: false,
  },
});

//创建路线表
const Route = mongoose.model("Route", routeSchema);

module.exports = {
  User,
  Route,
};
