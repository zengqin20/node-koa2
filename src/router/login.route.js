const Router = require("koa-router");
const router = new Router({ prefix: "/common" });

const {
  getTokenKey,
  handleRegister,
} = require("../controller/login.controller");

//处理登录token问题
router.post("/login", getTokenKey);

//处理注册问题
router.post("/register", handleRegister);

module.exports = router;
