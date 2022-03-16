//router
const Router = require("koa-router");
const router = new Router({ prefix: "/api" });
const {
  besideBus,
  searchKeyword,
} = require("../controller/oldUser.controller.js");
//设置前缀
// router.prefix("/api");

//处理附近公交
router.get("/beside", besideBus);

//处理搜索功能
router.get("/search", searchKeyword);

module.exports = router;
