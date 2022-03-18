const { queryData } = require("../../utils");
const { appid, secret, session } = require("../../utils/common");

async function getSession(code) {
  const data = {
    appid,
    secret,
    js_code: code,
    grant_type: "authorization_code",
  };
  const res = await queryData(session, data);
  //获取session_id 和 open_id
  return res.body;
}

module.exports = {
  getSession,
};
