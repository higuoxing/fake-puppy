const express = require('express');
const router = express.Router();
const gen_qrcode = require('../../utils/admin/qrcode').gen_qrcode;

router.get('/', async (req, res, next) => {
  let qrcode = await gen_qrcode();
  res.render('admin/qrcode', { qrcode: qrcode });
});

module.exports = router
