const app = require("./app");
//引入数据库
const { connectDB } = require("./database");

//中间件
//ctx 记录上下文
app.use((ctx, next) => {
  ctx.body = "api";
});

app.listen(3000, () => {
  console.log("server is running on http://localhost:3000");
});

//启动数据库
connectDB();
