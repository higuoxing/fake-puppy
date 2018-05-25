const admin_model = require('../model/admin');

const _get_the_only_admin = async () => {
  let admin = await admin_model.findOne({ role: 'admin' });
  return admin;
}

const _check_admin_exist = async () => {
  let admin = await admin_model.findOne({ role: 'admin' }).exec();
  if (admin) {
    return true;
  } else {
    return false;
  }
}

const _insert_admin = async (admin) => {
  await admin_model.create({
    username: admin.username      ,
    password: admin.password      ,
    salt    : admin.salt          ,
    role    : 'admin'             ,
    devices : [ /*empty array*/ ] ,
  });
}

const _get_all_devices = async () => {
  let admin = await admin_model.findOne({ role: 'admin' });
  if (admin) {
    // admin exists
    return admin.devices;
  } else {
    // admin not exists
    return null;
  }
}

const _get_specific_device = async (device) => {
  let admin = await admin_model.findOne({
    role: 'admin',
    'devices.gw_id': device.gw_id
  }, { 'devices.$': 1 });
  return admin.devices[0];
}

const _check_device_exist = async (device) => {
  let admin = await admin_model.findOne({
    role: 'admin',
    'devices.gw_id': device.gw_id
  }, { 'devices.$': 1 });
  if (admin) {
    return true;
  } else {
    return false;
  }
}

const _insert_device = async (device) => {
  let _device = await _check_device_exist(device);
  if (_device) {
    // device has already existed
    // do nothing but reject
    return false;
  } else {
    // update devices subdoc
    // if not exists, add it to db
    await admin_model.findOneAndUpdate({ role: 'admin' }, {
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
    });
    return true;
  }
}

const _update_specific_device = async (device, origin_device) => {
  let new_device = await admin_model.findOne({
    role: 'admin',
    'devices.gw_id': device.gw_id
  });
  if (new_device && device.gw_id != origin_device.gw_id) {
    // gw_id has been taken
    return false;
  } else {
    await admin_model.findOneAndUpdate(
      { role  : 'admin', 'devices.gw_id': origin_device.gw_id },
      {
        '$set': {
          'devices.$.gw_id'             : device.gw_id   ,
          'devices.$.gw_addr'           : device.gw_addr ,
          'devices.$.gw_port'           : device.gw_port
      }
    });
    return true;
  }
}

const _remove_specific_device = async (device) => {
  try {
    await admin_model.update({ role: 'admin' },
      { '$pull': { devices: { gw_id: device.gw_id } } });
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = {
  get_the_only_admin     : _get_the_only_admin     ,
  check_admin_exist      : _check_admin_exist      ,
  insert_admin           : _insert_admin           ,
  check_device_exist     : _check_device_exist     ,
  get_all_devices        : _get_all_devices        ,
  get_specific_device    : _get_specific_device    ,
  insert_device          : _insert_device          ,
  remove_specific_device : _remove_specific_device ,
  update_specific_device : _update_specific_device ,
}
