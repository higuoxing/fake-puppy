const crypto = require('crypto');
const user_model = require('../db/model/user');
const admin_model = require('../db/model/admin');
const get_index_info = require('./panel').get_index_info;

const _gen_qrcode = async (device) => {

  let qrCode = require('qrcode');
  // share link

  let unused_hash = await user_model.find({ state: 'pending' }).exec();
  let _hash = null;
  let url = null;

  if (unused_hash[0]) {
    // unused hash
    _hash = unused_hash[0].token;
    // FIXME: hard code url
    url = `http://${device.gw_addr}:${device.gw_port}/wifidog/auth?token=${_hash}`;
  } else {
    // generate hash code and add to db
    let current_date = (new Date()).valueOf().toString();
    let random = Math.random().toString();
    _hash = crypto.createHash('sha1').update(current_date + random).digest('hex').slice(32);
    // FIXME: hard code url
    url = `http://${device.addr}:${device.port}/wifidog/auth?token=${_hash}`;
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

  return { qrcode: await qrCode.toDataURL(url), url: url, index_info: _index_info, token: _hash, active: device.gw_id };
}

module.exports = {
  gen_qrcode: _gen_qrcode
}
