const express = require('express');
const router = express.Router();
const check_admin = require('../../../utils/admin/login').check_admin;

// check login form
router.post('/', async (req, res, next) => {
  let _username = req.body.username;
  let _password = req.body.password;
  if (!(_username && _password)) {
    // check username and password exist
    req.flash('error', 'Please input username and password');
  } else {
    // check username and password
    if (await check_admin({ username: _username, password: _password })) {
      req.session.user = 'admin';
      req.flash('success', 'Welcome ~');
      res.redirect('/admin/panel');
    } else {
      req.flash('error', 'Incorrect username or password :( ');
      res.redirect('/admin/login');
    }
  }
});

module.exports = router
