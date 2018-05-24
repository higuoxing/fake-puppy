const express = require('express');
const router = express.Router();
const admin_model = require('../../../utils/db/model/admin');
const _socket_conf = require('../../../configs/default').socket_conf;
const check_admin_login = require('../../../middlewares/check_login').check_admin_login;
const insert_device = require('../../../utils/db/access/admin').insert_device;
const safe_update_device = require('../../../utils/admin/device').safe_update_device;

router.post('/', check_admin_login, async (req, res, next) => {

  let _device = req.body;

  if (_device.type === 'update') {
    await safe_update_device(_device, req.session.user);
  } else if (_device.type === 'insert') {
    let status = await insert_device(_device);
    if (status) {
      // success
      req.flash('success', 'Successful');
    } else {
      // failed
      req.flash('error', 'Gateway ID has been taken!');
    }
  } else if (_device.type === 'remove') {

  }
  res.redirect('/admin/device');
});

module.exports = router
