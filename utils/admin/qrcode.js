const crypto = require('crypto');
const qrCode = require('qrcode');
const user_model = require('../db/model/user');
const admin_model = require('../db/model/admin');
const get_index_info = require('./panel').get_index_info;

const _gen_qrcode = async (gw_id) => {

  // share link
  let unused_hash = await user_model.find({ state: 'pending' }).exec();
  let hash = null;
  let url = null;
  let device = null;

  if (gw_id) {
    // gw_id exists
    device = (await admin_model.findOne({
      username: 'admin',
      'devices.gw_id': gw_id,
      'devices': {
        '$size': 1
      }
    })).devices[0];
  } else {
    // gw_id not exists
    device = (await admin_model.findOne({ username: 'admin' })).devices[0];
  }

  if (unused_hash[0]) {
    // unused hash
    hash = unused_hash[0].token;
    url = `http://${device.gw_addr}:${device.gw_port}/wifidog/auth?token=${hash}`;
  } else {
    // generate hash code and add to db
    let current_date = (new Date()).valueOf().toString();
    let random = Math.random().toString();
    hash = crypto.createHash('sha1').update(current_date + random).digest('hex').slice(32);
    url = `http://${device.addr}:${device.port}/wifidog/auth?token=${hash}`;
    await user_model.create({
      mac_addr: '',
      ip_addr: '',
      token: _hash,
      state: 'pending',
      gw_id: '',
      incoming: [ 0 ],
      outgoing: [ 0 ]
    });
  }

  let _index_info = await get_index_info();

  return {
    qrcode     : await qrCode.toDataURL(url),
    url        : url,
    index_info : _index_info,
    token      : hash,
    active     : device.gw_id
  };
}

module.exports = {
  gen_qrcode: _gen_qrcode
}
