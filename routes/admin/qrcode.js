const express = require('express');
const router = express.Router();
const admin_model = require('../../utils/db/model/admin');
const gen_qrcode = require('../../utils/admin/qrcode').gen_qrcode;
const check_admin_login = require('../../middlewares/check_login').check_admin_login;

router.get('/', check_admin_login, async (req, res, next) => {
  // generate qrcode
  let _device = req.query;
  if (_device.gw_id) {
    try {
      let device = (await admin_model.findOne(
        {
          username: 'admin',
          'devices.gw_id': _device.gw_id },
        {
          'devices.$': 1
      })).devices[0];
      let qrcode = await gen_qrcode(device);
      let _devices = (await admin_model.findOne({ username: 'admin' })).devices;
      res.render('admin/qrcode', { qrcode: qrcode, devices: _devices });
    } catch (e) {
      res.redirect('back');
    }
  } else {
    try {
      let device = (await admin_model.findOne({ username: 'admin' })).devices[0];
      let qrcode = await gen_qrcode(_device);
      let _devices = (await admin_model.findOne({ username: 'admin' })).devices;
      res.render('admin/qrcode', { qrcode: qrcode, devices: _devices });
    } catch (e) {
      res.redirect('back');
    }
  }
});

module.exports = router
