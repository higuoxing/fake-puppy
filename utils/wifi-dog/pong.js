const admin_model = require('../db/model/admin');

const _pong = async (ping_msg) => {
  
  let gw_id = ping_msg.gw_id;
  let device = await admin_model.findOne({ username: 'admin', 'devices.gw_id': gw_id }).exec();
  if (device) {
    // device has registered
    await admin_model.findOneAndUpdate({
      username: 'admin',
      'devices.gw_id': gw_id
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
    // if not exists, add it to db
    // await admin_model.findOneAndUpdate({ username: 'admin' }, {
    //   '$push': {
    //     'devices': {
    //       gw_id: ping_msg.gw_id,
    //       sys_uptime: ping_msg.sys_uptime,
    //       wifidog_uptime: ping_msg.wifidog_uptime,
    //       sys_memfree: [ ping_msg.sys_memfree ],
    //       sys_load: [ ping_msg.sys_load ]
    //     }
    //   }
    // }).exec();
    // FIXME: do nothing
    return 'Pong';
  }
}

module.exports = {
  pong: _pong
}
