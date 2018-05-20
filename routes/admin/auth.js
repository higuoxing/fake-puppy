const express = require('express');
const router = express.Router();
const admin_model = require('../../utils/db/model/admin');
const user_model = require('../../utils/db/model/user');
const check_admin_login = require('../../middlewares/check_login').check_admin_login;

router.get('/kickout', check_admin_login, async (req, res, next) => {
  let _token = req.query.token;

  // query and update state => pending
  await user_model.findOneAndUpdate({ token: _token }, { state: 'pending' });

  res.redirect('back');
});

router.get('/remove', check_admin_login, async (req, res, next) => {
  let _token = req.query.token;

  // query and remove
  await user_model.remove({ token: _token }).exec();

  res.redirect('back');
});

router.get('/auth', async (req, res, next) => {
  let _token = req.query.token;
  let url = `http://192.168.2.1:2060/wifidog/auth?token=${_token}`;
  res.redirect(302, url);
});

module.exports = router
