const express = require('express');
const router = express.Router();
const admin_model = require('../../utils/db/model/admin');
const _socket_conf = require('../../configs/default').socket_conf;
const check_admin_login = require('../../middlewares/check_login').check_admin_login;
const safe_insert_device = require('../../utils/admin/device').safe_insert_device;
const safe_update_device = require('../../utils/admin/device').safe_update_device;

router.get('/', check_admin_login, async (req, res, next) => {
  let admin = await admin_model.findOne({ username: 'admin' }).exec();
  let _devices = admin.devices;
  res.render('admin/device', { devices: _devices, socket_conf: _socket_conf, live_display: true });
});

module.exports = router
