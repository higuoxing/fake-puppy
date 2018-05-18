const user_model = require('../db/model/user');

const _auth = async (auth_req_msg) => {
  // 162.158.255.33 - - [17/May/2018:08:53:35 +0000] "GET /wifidog/auth/?stage=counters&ip=192.168.2.201&mac=8c:45:00:31:07:d4&token=789&incoming=208963&outgoing=183237&gw_id=24660045 HTTP/1.1" 200 7 "-" "WiFiDog 1.3.0" "180.102.121.226"
  // processing req
  if (auth_req_msg.stage === 'login') {
    // auth branch
    let user = await user_model.findOne({ token: auth_req_msg.token }).exec();
    if (user.state === 'pending') {
      // token not taken return 1
      // update db
      let _user_update = {
        mac_addr: auth_req_msg.mac,
        ip_addr: auth_req_msg.ip,
        state: 'activate',
        incoming: auth_req_msg.incoming,
        outgoing: auth_req_msg.outgoing,
        gw_id: auth_req_msg.gw_id
      }

      await user_model.findOneAndUpdate({ token: auth_req_msg.token }, _user_update).exec();
      return 'Auth: 1';
    } else {
      // token has been taken
      return 'Auth: 0';
    }
  } else if (auth_req_msg.stage === 'counter') {
    // counter branch
    // update db and return 1;
    let user = await user_model.findOne({ token: auth_req_msg.token }).exec();
    if (user) {
      let _user_update = {
        mac_addr: auth_req_msg.mac,
        ip_addr: auth_req_msg.ip,
        state: 'activate',
        incoming: auth_req_msg.incoming,
        outgoing: auth_req_msg.outgoing,
        gw_id: auth_req_msg.gw_id
      }
      await user_model.findOneAndUpdate({ token: auth_req_msg.token }, _user_update).exec();
      return 'Auth: 1';
    } else {
      return 'Auth: 1';
    }
  } else {
    // not known return 0
    return 'Auth: 0';
  }

}

module.exports = {
  auth: _auth
}
