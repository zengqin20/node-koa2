const Router = require("koa-router");
const router = new Router({ prefix: "/child" });

const { handleBind } = require("../controller/childUser.controller");

//处理绑定账户问题
router.post("/bind", handleBind);
module.exports = router;
