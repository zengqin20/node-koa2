const Router = require("koa-router");
const router = new Router({ prefix: "/child" });

const {
  handleBind,
  getBindMessage,
  handleSync,
  getSyncMessage,
  getLocation,
} = require("../controller/childUser.controller");

//处理绑定账户问题
router.post("/bind", handleBind);
router.get("/bind", getBindMessage);

//处理同步地址问题
router.get("/sync", getSyncMessage);
router.post("/sync", handleSync);

//处理实时定位
router.get("/location", getLocation);

module.exports = router;
