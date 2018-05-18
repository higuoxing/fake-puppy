const express = require('express');
const router = express.Router();
const check_admin = require('../../utils/admin/login').check_admin;
const check_admin_login = require('../../middlewares/check_login').check_admin_login;

router.get('/', async (req, res, next) => {
  if (req.session.user === 'admin') {
    res.render('admin/device');
  } else {
    res.render('admin/login');
  }
});


module.exports = router
