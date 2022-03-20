const { basicData, queryData } = require("../../utils");
let { searchBeside, searchKey, searchLocation } = require("../../utils/common");
const { key } = require("../../utils/common");

//1.查询公交站相关信息
async function getBeside(lat, lng) {
  //经纬度
  let besideData = new basicData("公交车");

  //增加经纬度
  besideData.boundary = `nearby(${lat},${lng},100)`;

  const res = await queryData(searchBeside, besideData);

  return res.body;
}

//2. 关键字提示
async function getMessage(keyword, region) {
  let data = new basicData(keyword);
  data.region = region;

  //请求数据
  const res = await queryData(searchKey, data);
  return res.body;
}

//3. 获取位置信息
async function getLocation(lat, lng) {
  //获取经纬度
  const data = {
    location: `${lat},${lng}`,
    key,
  };
  const res = await queryData(searchLocation, data);
  //获取城市

  return res.body;
}

module.exports = {
  getBeside,
  getMessage,
  getLocation,
};
