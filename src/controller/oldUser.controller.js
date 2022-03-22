const { getTime, verifyToken } = require("../utils/index");
const {
  getBeside,
  getMessage,
  getLocation,
  getLng,
} = require("../request/map");
const { findInfo, createInfo, updateInfo } = require("../database/util");

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

    const city = JSON.parse(res).result.address;

    ctx.body = {
      city,
    };
  }

  async routeMessage(ctx, next) {
    //获取唯一标识信息
    // const openId = ctx.url.match(/(?<=\=).+/g)[0];
    const token = ctx.request.header.authorization.match(/(?<=\s).+$/g)[0];
    const openId = verifyToken(token);

    //查询对应路线信息
    const dbRes = await findInfo("Route", { openId });

    //返回对应数据
    ctx.body = {
      isRoute: Boolean(dbRes) && Boolean(dbRes.route.length),
      route: dbRes?.route,
    };
  }

  async addRoute(ctx, next) {
    const { start, end } = ctx.request.body;

    //解析token 获取openId
    const token = ctx.request.header.authorization.match(/(?<=\s).+$/g)[0];
    const openId = verifyToken(token);

    //查询数据库 是否有用户
    const findRes = await findInfo("Route", { openId });
    let res;

    if (findRes) {
      //更新数据库
      res = await updateInfo({
        openId,
        route: findRee.route.concat([{ start, end }]),
      });
    } else {
      //新建
      res = await createInfo("Route", {
        openId,
        route: [{ start, end }],
      });
    }

    ctx.body = {
      update: res,
    };
  }

  //增加、修改Home
  async addHome(ctx, next) {
    const { nickName, address } = ctx.request.body;
    //解析出经纬度坐标
    const lngRes = await getLng(address);
    const lngLocation = JSON.parse(lngRes).result.location;

    //解析token 获取openId
    const token = ctx.request.header.authorization.match(/(?<=\s).+$/g)[0];
    const openId = verifyToken(token);

    //查询数据库
    const findRes = await findInfo("Route", { openId });
    let res;

    //存在用户信息
    if (findRes) {
      //更新数据库
      res = await updateInfo({
        openId,
        homeRoute: findRes.homeRoute.concat([
          { nickName, address, lngLocation },
        ]),
      });
    } else {
      //新建
      res = await createInfo("Route", {
        openId,
        homeRoute: [{ nickName, address, lngLocation }],
      });
    }

    ctx.body = {
      update: res,
    };
  }

  //查询回家信息
  async homeMessage(ctx, next) {
    //获取唯一标识信息
    // const openId = ctx.url.match(/(?<=\=).+/g)[0];
    const token = ctx.request.header.authorization.match(/(?<=\s).+$/g)[0];
    const openId = verifyToken(token);

    //查询对应家庭住址
    const dbRes = await findInfo("Route", { openId });

    //返回对应数据
    ctx.body = {
      isHome: Boolean(dbRes) && Boolean(dbRes.homeRoute.length),
      home: dbRes?.homeRoute,
    };
  }

  async deleteHome(ctx, next) {
    const { nickName, address, lngLocation } = ctx.request.body;

    //解析token 获取openId
    const token = ctx.request.header.authorization.match(/(?<=\s).+$/g)[0];
    const openId = verifyToken(token);

    //查询数据库
    const findRes = await findInfo("Route", { openId });
    let res;

    //存在用户信息
    if (findRes) {
      const homes = findRes.homeRoute.filter((item) => {
        const { nickName: name, address: addr } = item;
        if (nickName === name && addr === address) return false;
        else return true;
      });

      //删除相关,更新数据
      res = await updateInfo({
        openId,
        homeRoute: homes,
      });
    }

    ctx.body = {
      update: res,
    };
  }
}

module.exports = new oldUserController();
