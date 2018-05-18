const express = require('express');
const router = express.Router();
const check_admin = require('../../utils/admin/login').check_admin;
const check_admin_login = require('../../middlewares/check_login').check_admin_login;

router.get('/', async (req, res, next) => {
  if (req.session.user === 'admin') {
    res.render('admin/panel');
  } else {
    res.render('admin/login');
  }
});

router.post('/', async (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  if (!(username && password)) {
    req.flash('error', 'Please input username and password');
  } else {
    if (await check_admin({ username: username, password: password })) {
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
