const express = require('express');
const router = express.Router();
const admin_model = require('../../utils/db/model/admin');
const _socket_conf = require('../../configs/default').socket_conf;
const check_admin_login = require('../../middlewares/check_login').check_admin_login;
const safe_insert_device = require('../../utils/admin/device').safe_insert_device;
const safe_update_device = require('../../utils/admin/device').safe_update_device;

router.get('/remove', check_admin_login, async (req, res, next) => {
  // remove admin
  let _gw_id = req.query.gw_id;
  let admin = await admin_model.update(
    { username: 'admin' },
    { '$pull':
      { devices: { gw_id: _gw_id } }
  });
  res.redirect('/admin/device');
});

router.post('/', check_admin_login, async (req, res, next) => {
  let _device = req.body;

  // FIXME:
  if (_device.type === 'update') {
    await safe_update_device(_device);
  } else if (_device.type === 'insert') {
    let status = await safe_insert_device(_device);
    if (status) {
      // success
      req.flash('success', { msg: 'Successful' });
    } else {
      // failed
      req.flash('error', { msg: 'Gateway ID has been taken!' });
    }
  }
  res.redirect('/admin/device');
});

module.exports = router
