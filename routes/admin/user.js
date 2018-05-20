const express = require('express');
const router = express.Router();
const user_model = require('../../utils/db/model/user');
const check_admin = require('../../utils/admin/login').check_admin;
const check_admin_login = require('../../middlewares/check_login').check_admin_login;

router.get('/active', check_admin_login, async (req, res, next) => {
  let _users = await user_model.find({ state: 'activate' }).exec();
  res.render('admin/user', { users: _users });
});

router.get('/all', check_admin_login, async (req, res, next) => {
  let _users = await user_model.find({ '$or': [{ state: 'activate' }, { state: 'pending' }] }).exec();
  res.render('admin/user', { users: _users });
});

router.get('/device', check_admin_login, async (req, res, next) => {
  let _gw_id = req.query.gw_id;
  let _users = await user_model.find({ gw_id: _gw_id }).exec();
  res.render('admin/user', { users: _users });
});

module.exports = router
