//router
const Router = require("koa-router");
const router = new Router({ prefix: "/api" });
const { besideBus } = require("../controller/oldUser.controller.js");
//设置前缀
// router.prefix("/api");

//处理附近公交
router.get("/beside", besideBus);
console.log(besideBus);

module.exports = router;

//I5CBZ-Z4TKG-KS6QF-IG4XK-UKEVS-QEFBV
