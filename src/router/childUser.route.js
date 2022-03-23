const Router = require("koa-router");
const router = new Router({ prefix: "/child" });

const {
  handleBind,
  getBindMessage,
} = require("../controller/childUser.controller");

//处理绑定账户问题
router.post("/bind", handleBind);
router.get("/bind", getBindMessage);
module.exports = router;
