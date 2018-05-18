const express = require('express');
const router = express.Router();
const user_model = require('../../utils/db/model/user');
const check_admin = require('../../utils/admin/login').check_admin;
const check_admin_login = require('../../middlewares/check_login').check_admin_login;

router.get('/', async (req, res, next) => {
  if (req.session.user === 'admin') {
    let _users = await user_model.find({ state: 'activate' }).exec();
    res.render('admin/user', { users: _users });
  } else {
    res.render('admin/login');
  }
});


module.exports = router
