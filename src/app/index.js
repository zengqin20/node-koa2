const Koa = require("koa");
const oldUserRouter = require("../router/oldUser.route");

const app = new Koa();

//使用路由
app.use(oldUserRouter.routes());

module.exports = app;
