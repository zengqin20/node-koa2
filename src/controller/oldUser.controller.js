const { getTime } = require("../utils/index");
const { getBeside, getMessage, getLocation } = require("../request/map");

class oldUserController {
  async besideBus(ctx, next) {
    const params = ctx.url.match(/\d+.\d+/g);
    const lat = params?.[0];
    const lng = params?.[1];

    //获取并且处理返回数据
    const res = await getBeside(lat, lng);

    const result = JSON.parse(res).data?.map((item) => {
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

  //处理搜索功能
  async searchKeyword(ctx, next) {
    //get请求时请求参数获取
    // const word = ctx.url.match(/(?<=\=).+?((?=\&)|$)/g);

    const { keyword: key, region } = ctx.request.body;

    if (key === null) {
      ctx.body = "";
      return;
    }

    //获取数据
    const res = await getMessage(key, region);

    console.log(res);
    const result = JSON.parse(res).data.map((item) => {
      //处理数据
      const { title, address, location } = item;
      return {
        title,
        address,
        location,
      };
    });

    ctx.body = result;
  }

  async locationMessage(ctx, next) {
    const params = ctx.url.match(/\d+.\d+/g);
    const lat = params?.[0];
    const lng = params?.[1];

    //获取并且处理返回数据
    const res = await getLocation(lat, lng);

    const city = JSON.parse(res).result.address_component.city;

    ctx.body = {
      city,
    };
  }
}

module.exports = new oldUserController();
