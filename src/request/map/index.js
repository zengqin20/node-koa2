const { basicData, queryData } = require("../../utils");
let { searchBeside, searchKey } = require("../../utils/common");

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
async function getMessage(keyword) {
  const data = new basicData(keyword);

  //请求数据
  const res = await queryData(searchKey, data);
  return res.body;
}

module.exports = {
  getBeside,
  getMessage,
};
