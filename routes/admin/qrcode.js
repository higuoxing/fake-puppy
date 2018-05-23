const express = require('express');
const router = express.Router();
const admin_model = require('../../utils/db/model/admin');
const gen_qrcode = require('../../utils/admin/qrcode').gen_qrcode;
const check_admin_login = require('../../middlewares/check_login').check_admin_login;

router.get('/', check_admin_login, async (req, res, next) => {
  // generate qrcode
  let _gw_id = req.query.gw_id;
  let qrcode = await gen_qrcode(_gw_id);
  let _devices = (await admin_model.findOne({ username: 'admin' })).devices;
  res.render('admin/qrcode', { qrcode: qrcode, devices: _devices });
});

module.exports = router
