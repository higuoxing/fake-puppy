const express = require('express');
const router = express.Router();
const gen_qrcode = require('../../utils/admin/qrcode').gen_qrcode;
const check_admin_login = require('../../middlewares/check_login').check_admin_login;

router.get('/', check_admin_login, async (req, res, next) => {
  // generate qrcode
  let qrcode = await gen_qrcode();
  res.render('admin/qrcode', { qrcode: qrcode });
});

module.exports = router
