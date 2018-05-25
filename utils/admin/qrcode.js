const crypto              = require('crypto');
const qrCode              = require('qrcode');
const get_all_devices     = require('../db/access/admin').get_all_devices;
const get_specific_device = require('../db/access/admin').get_specific_device;
const insert_one_user     = require('../db/access/user').insert_one_user;
const get_pending_users   = require('../db/access/user').get_pending_users;

const _gen_qrcode = async (device) => {

  let devices = await get_all_devices();
  let _device = null;

  if (devices.length > 0) {
    // devices exist
    if (device.gw_id) {
      // specific device
      _device = await get_specific_device(device);
    } else {
      // no specific device
      _device = devices[0];
    }
    
    // query pending_users
    let pending_users = await get_pending_users();

    if (pending_users.length > 0) {
      // pending users exist
      let hash = pending_users[0].token;
      let url = `http://${_device.gw_addr}:${_device.gw_port}/wifidog/auth?token=${hash}`;
      return {
        qrcode     : await qrCode.toDataURL(url) ,
        url        : url                         ,
        token      : hash                        ,
        active     : _device.gw_id               ,
        status     : true
      };

    } else {
      // there's no pending users
      // create one
      let current_date = (new Date()).valueOf().toString();
      let random = Math.random().toString();
      let hash = crypto.createHash('sha1').update(current_date + random).digest('hex').slice(32);
      let url = `http://${_device.gw_addr}:${_device.gw_port}/wifidog/auth?token=${hash}`;
      let status = await insert_one_user({
        mac_addr: ''     ,
        ip_addr: ''      ,
        token: hash      ,
        state: 'pending' ,
        gw_id: ''        ,
        incoming: [ 0 ]  ,
        outgoing: [ 0 ]
      });

      if (status) {
        // create success
        return {
          qrcode     : await qrCode.toDataURL(url) ,
          url        : url                         ,
          token      : hash                        ,
          active     : _device.gw_id               ,
          status     : true
        };

      } else {
        // create failed
        return { status: false };
      }
    }
  } else {
    // devices not exist
    return { status : false };
  }
}

module.exports = {
  gen_qrcode: _gen_qrcode
}
