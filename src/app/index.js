const Koa = require("koa");
const oldUserRouter = require("../router/oldUser.route");
const loginRouter = require("../router/login.route");
const childUserRoute = require("../router/childUser.route");
//引入中间件
const bodyParser = require("koa-bodyparser");

const app = new Koa();
app.use(bodyParser());

//使用路由 响应
app.use(oldUserRouter.routes());
app.use(loginRouter.routes());
app.use(childUserRoute.routes());

module.exports = app;
