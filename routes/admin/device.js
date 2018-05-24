const express           = require('express');
const router            = express.Router();
const _socket_conf      = require('../../configs/default').socket_conf;
const get_all_devices   = require('../../utils/db/access/admin').get_all_devices;
const check_admin_login = require('../../middlewares/check_login').check_admin_login;

router.get('/', check_admin_login, async (req, res, next) => {
  let _devices = await get_all_devices();
  res.render('admin/device', {
    devices: _devices,
    socket_conf: _socket_conf,
    live_display: true
  });
});

module.exports = router
