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
    let _check = await check_admin({
      username: _username,
      password: _password,
      sess_id: req.sessionID
    });
    if (_check === 'auth') {
      req.session.user = _username;
      req.flash('success', 'Welcome ~');
      res.redirect('/admin/panel');
    } else if (_check === 'not-permitted'){
      req.flash('error', 'Incorrect username or password :( ');
      res.redirect('/admin/login');
    } else if (_check === 'first-time-register') {
      res.send('hello');
    }
  }
});

module.exports = router
