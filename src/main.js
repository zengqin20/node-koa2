const app = require("./app");

//中间件
//ctx 记录上下文
app.use((ctx, next) => {
  ctx.body = "api";
});

app.listen(3000, () => {
  console.log("server is running on http://localhost:3000");
});
