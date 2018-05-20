const express = require('express');
const router = express.Router();
const admin_model = require('../../utils/db/model/admin');
const check_admin_login = require('../../middlewares/check_login').check_admin_login;

router.get('/', check_admin_login, async (req, res, next) => {
  let admin = await admin_model.findOne({ username: 'admin' }).exec();
  let _devices = admin.devices;
  res.render('admin/device', { devices: _devices });
});

module.exports = router