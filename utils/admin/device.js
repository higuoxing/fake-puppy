const admin_model = require('../db/model/admin');

const _safe_insert_device = async (device) => {
  // check if gw_id exists
  let _device = await admin_model.findOne({ username: 'admin', 'devices.gw_id': device.gw_id });
  if (_device) {
    // do nothing but reject
    return false;
  } else {
    // update devices subdoc
    // if not exists, add it to db
    await admin_model.findOneAndUpdate({ username: 'admin' }, {
      '$push': {
        'devices': {
          gw_id: device.gw_id,
          gw_addr: device.gw_addr,
          gw_port: device.gw_port,
          sys_uptime: 0,
          wifidog_uptime: 0,
          sys_memfree: [ 0 ],
          sys_load: [ 0 ]
        }
      }
    }).exec();
    return true;
  }
}

const _safe_update_device = async (device) => {

  let _new_device = await admin_model.findOne({ username: 'admin', 'devices.gw_id': device.gw_id });
  if (_new_device && device.gw_id != device.origin_gw_id) {
    // gw_id has been taken
    return false;
  } else {
    await admin_model.findOneAndUpdate(
      { username: 'admin', 'devices.gw_id': device.origin_gw_id },
      {
        '$set': {
          'devices.$.gw_id': device.gw_id,
          'devices.$.gw_addr': device.gw_addr,
          'devices.$.gw_port': device.gw_port
      }
    });
    return true;
  }
}

module.exports = {
  safe_insert_device: _safe_insert_device,
  safe_update_device: _safe_update_device
}
