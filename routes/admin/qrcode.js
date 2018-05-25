const express           = require('express');
const router            = express.Router();
const get_all_devices   = require('../../utils/db/access/admin').get_all_devices;
const gen_qrcode        = require('../../utils/admin/qrcode').gen_qrcode;
const get_index_info    = require('../../utils/admin/panel').get_index_info;
const check_admin_login = require('../../middlewares/check_login').check_admin_login;

router.get('/', check_admin_login, async (req, res, next) => {
  // generate qrcode
  let _gw_id      = req.query.gw_id;
  let _qrcode     = await gen_qrcode({ gw_id: _gw_id });
  let _index_info = await get_index_info();
  let _devices    = await get_all_devices();
  res.render('admin/qrcode', {
    qrcode      : _qrcode     ,
    devices     : _devices    ,
    index_info  : _index_info ,
  });
});

module.exports = router
