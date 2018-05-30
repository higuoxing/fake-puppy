const express            = require('express');
const router             = express.Router();
const check_admin_exist  = require('../../utils/db/access/admin').check_admin_exist;
const get_the_only_admin = require('../../utils/db/access/admin').get_the_only_admin;

router.get('/', async (req, res, next) => {
  if (req.session.user) {
    res.redirect('/admin/panel');
  } else {
    // not log in
    let _check_admin_exist = await check_admin_exist();
    if (_check_admin_exist) {
      let salt = (await get_the_only_admin()).salt;
      res.render('admin/login', {
        sess_id : req.sessionID,
        salt    : salt
      });
    } else {
      res.redirect('/admin/register');
    }
  }
});

module.exports = router
