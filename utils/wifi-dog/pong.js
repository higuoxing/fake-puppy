const admin_model = require('../db/model/admin');

const _pong = async (ping_msg) => {
  // GET /wifidog/ping/?gw_id=24660045&sys_uptime=3840&sys_memfree=99256&sys_load=0.09&wifidog_uptime=362 200 0.585 ms - 4
  let gw_id = ping_msg.gw_id;
  let device = await admin_model.findOne({ username: 'admin', 'devices.gw_id': gw_id }).exec();
  if (device) {

    await admin_model.findOneAndUpdate({
      username: 'admin',
      'devices.gw_id': gw_id, devices: { '$size': 1 }
    }, {
      'devices.$.sys_uptime': ping_msg.sys_uptime,
      'devices.$.wifidog_uptime': ping_msg.wifidog_uptime,
      '$push': {
        'devices.$.sys_memfree': ping_msg.sys_memfree,
        'devices.$.sys_load': ping_msg.sys_load
      }
    }).exec();

    return 'Pong';
  } else {
    return 'Sorry';
  }
}

module.exports = {
  pong: _pong
}
