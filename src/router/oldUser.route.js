//router
const Router = require("koa-router");
const router = new Router({ prefix: "/api" });

const {
  besideBus,
  searchKeyword,
  locationMessage,
  routeMessage,
  addRoute,
  homeMessage,
  addHome,
  deleteHome,
} = require("../controller/oldUser.controller.js");
//设置前缀
// router.prefix("/api");

//处理附近公交
router.get("/beside", besideBus);

//处理搜索功能
router.post("/search", searchKeyword);

//处理定位城市
router.get("/citymessage", locationMessage);

///处理常用路线
router.get("/commonroute", routeMessage);
router.post("/commonroute", addRoute);

//处理回家
router.get("/home", homeMessage);
router.post("/home", addHome);
router.post("/homedelete", deleteHome);

module.exports = router;
