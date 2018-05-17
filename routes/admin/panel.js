const express = require('express');
const router = express.Router();
const check_admin_login = require('../../middlewares/check_login').check_admin_login;

router.get('/', check_admin_login, async (req, res, next) => {
  res.render('admin/panel');
});

module.exports = router
