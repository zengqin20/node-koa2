const { key } = require("./common");
const queryString = require("querystring");
const koa2Req = require("koa2-request");

function getTime() {
  const random = Math.floor(Math.random() * 16) + 1;
  const random1 = Math.floor(Math.random() * 5) + 1;
  const random2 = Math.floor(Math.random() * 9) + 1;

  const arr = [
    random2,
    random1,
    "即将到达",
    random,
    random1,
    random2,
    random2,
    "等待发车",
    random2,
    random2,
    random1,
  ];

  return arr[Math.floor(Math.random() * 11)];
}

//基本请求数据
function basicData(keyword) {
  this.key = key;
  this.keyword = keyword;
}

//请求函数
function queryData(url, data) {
  let dataString = queryString.stringify(data);

  const query = `${url}?${dataString}`;

  return koa2Req(query);
}

module.exports = {
  getTime,
  basicData,
  queryData,
};
