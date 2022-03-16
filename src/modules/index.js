//模型对象
const mongoose = require("mongoose");

//1. 系统用户模型对象
const schema = new mongoose.Schema({
  name: String,
  password: String,
});

const oldUser = mongoose.model("oldUsers", schema);
const childUser = mongoose.model("childUser", schema);

module.exports = {
  oldUser,
  childUser,
};
