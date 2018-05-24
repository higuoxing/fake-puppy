const express = require('express');
const router = express.Router();
const check_admin_exist = require('../../utils/db/access/admin').check_admin_exist;

router.get('/', async (req, res, next) => {
  if (req.session.user) {
    res.redirect('/admin/panel');
  } else {
    // not log in
    let _check_admin_exist = await check_admin_exist();
    if (_check_admin_exist) {
      res.render('admin/login');
    } else {
      res.redirect('/admin/register');
    }
  }
});

module.exports = router
