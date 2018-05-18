const express = require('express');
const router = express.Router();
const admin_model = require('../../utils/db/model/admin');
const check_admin = require('../../utils/admin/login').check_admin;
const check_admin_login = require('../../middlewares/check_login').check_admin_login;

router.get('/', async (req, res, next) => {
  if (req.session.user === 'admin') {
    let admin = await admin_model.findOne({ username: 'admin' }).exec();
    let _devices = admin.devices;
    res.render('admin/device', { devices: _devices });
  } else {
    res.render('admin/login');
  }
});


module.exports = router
