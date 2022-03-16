//连接数据库
const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/map", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("数据库连接成功");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  connectDB,
};
