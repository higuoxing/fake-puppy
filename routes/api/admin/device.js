const express                = require('express');
const router                 = express.Router();
const check_admin_login      = require('../../../middlewares/check_login').check_admin_login;
const insert_device          = require('../../../utils/db/access/admin').insert_device;
const remove_specific_device = require('../../../utils/db/access/admin').remove_specific_device;
const update_specific_device = require('../../../utils/db/access/admin').update_specific_device;

router.get('/', check_admin_login, async (req, res, next) => {

  let device = req.query;

  if (device.type === 'update') {

    let origin_device = { gw_id: device.origin_gw_id };
    let new_device = {
      gw_id    : device.gw_id   ,
      gw_addr  : device.gw_addr ,
      gw_port  : device.gw_port ,
    };
    await update_specific_device(new_device, origin_device);
    res.redirect('/admin/device');

  } else if (device.type === 'insert') {

    let status = await insert_device(device);
    if (status) {
      // success
      req.flash('success', 'Successful');
    } else {
      // failed
      req.flash('error', 'Gateway ID has been taken!');
    }
    res.redirect('/admin/device');

  } else if (device.type === 'remove') {
    await remove_specific_device({ gw_id: device.gw_id });
    res.redirect('/admin/device');
  }
});

module.exports = router
