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

//创建老人用户表
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
  homeRoute: {
    type: Array,
    required: false,
  },
});

//创建路线表
const Route = mongoose.model("Route", routeSchema);

//3. 子女用户模型对象  设计表结构
const childSchema = new mongoose.Schema({
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

//创建子女用户表
const Child = mongoose.model("Child", childSchema);

module.exports = {
  User,
  Route,
  Child,
};
