const express = require('express');
const router = express.Router();
const insert_admin = require('../../../utils/db/access/admin').insert_admin;

// check login form
router.post('/', async (req, res, next) => {
  let _username   = req.body.username;
  let _password   = req.body.password;
  let _repassword = req.body.repassword;
  let _salt       = req.body.salt;
  if (!(_password === _repassword)) {
    req.flash('error', 'Two password should be same');
    res.redirect('/admin/register');
  } else {
    await insert_admin({
      username: _username,
      password: _password,
      salt    : _salt
    });
    req.session.user = _username;
    res.redirect('/admin/panel');
  }
});

module.exports = router
