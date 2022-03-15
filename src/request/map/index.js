const koa2Req = require("koa2-request");
const queryString = require("querystring");
let searchBeside = require("./map");

let besideData = {
  key: "I5CBZ-Z4TKG-KS6QF-IG4XK-UKEVS-QEFBV",
  keyword: "公交站",
  //经纬度
};

//1.查询公交站相关信息
async function getBeside(lat, lng) {
  //增加经纬度
  besideData.boundary = `nearby(${lat},${lng},100)`;
  let dataString = "";

  //参数扁平化
  dataString = queryString.stringify(besideData);
  //增加查询参数
  searchBeside = `${searchBeside}?${dataString}`;
  const res = await koa2Req(searchBeside);

  return res.body;
}

module.exports = {
  getBeside,
};
