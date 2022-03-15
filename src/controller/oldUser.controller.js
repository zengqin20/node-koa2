const getTime = require("../utils/index");

const { getBeside } = require("../request/map");
class oldUserController {
  async besideBus(ctx, next) {
    const params = ctx.url.match(/\d+.\d+/g);
    const lat = params?.[0];
    const lng = params?.[1];

    //获取并且处理返回数据
    const res = await getBeside(lat, lng);

    let result = JSON.parse(res).data?.map((item) => {
      //处理多条公交路线数据
      let route = item.address;
      route = route.split(",").slice(0, 2);
      route = route.map((item) => {
        return {
          name: item,
          time: getTime(),
        };
      });

      return {
        busStation: `${item.title.split("[")[0]}站`,
        route,
      };
    });

    ctx.body = result;
  }
}

module.exports = new oldUserController();
