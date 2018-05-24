const express = require('express');
const router = express.Router();
const check_admin_exist = require('../../utils/db/access/admin').check_admin_exist;
const gen_salt = require('../../utils/admin/encrypt').gen_salt;

router.get('/', async (req, res, next) => {
  let _check_admin_exist = await check_admin_exist();
  if (_check_admin_exist) {
    // admin exist
    res.redirect('/admin/login');
  } else {
    // admin is not existed
    let _salt = await gen_salt();
    res.render('admin/register', {
      salt    : _salt,
      sess_id : req.sessionID 
    });
  }
});

module.exports = router
