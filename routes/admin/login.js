const express = require('express');
const router = express.Router();
const admin_model = require('../../utils/db/model/admin');
const check_admin = require('../../utils/admin/login').check_admin;
const check_admin_login = require('../../middlewares/check_login').check_admin_login;

router.get('/', async (req, res, next) => {
  if (req.session.user === 'admin') {
    res.redirect('/admin/panel');
  } else {
    // not log in
    if ((await admin_model.find()).length < 1) {
      res.redirect('/admin/register');
    } else {
      res.render('admin/login');
    }
  }
});

module.exports = router
