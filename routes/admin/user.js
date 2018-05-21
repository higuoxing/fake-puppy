const express = require('express');
const router = express.Router();
const user_model = require('../../utils/db/model/user');
const check_admin = require('../../utils/admin/login').check_admin;
const check_admin_login = require('../../middlewares/check_login').check_admin_login;
const _socket_conf = require('../../configs/default').socket_conf;

// get active users
router.get('/active', check_admin_login, async (req, res, next) => {
  let _users = await user_model.find({ state: 'activate' }).exec();
  res.render('admin/user', { users: _users, socket_conf: _socket_conf });
});

// get all users
router.get('/all', check_admin_login, async (req, res, next) => {
  let _users = await user_model.find({ '$or': [{ state: 'activate' }, { state: 'pending' }] }).exec();
  res.render('admin/user', { users: _users, socket_conf: _socket_conf });
});

// get users of some device
router.get('/device', check_admin_login, async (req, res, next) => {
  let _gw_id = req.query.gw_id;
  let _users = await user_model.find({ gw_id: _gw_id }).exec();
  res.render('admin/user', { users: _users, socket_conf: _socket_conf });
});

module.exports = router
