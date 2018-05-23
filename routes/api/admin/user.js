const express = require('express');
const router = express.Router();
const admin_model = require('../../../utils/db/model/admin');
const user_model = require('../../../utils/db/model/user');
const check_admin_login = require('../../../middlewares/check_login').check_admin_login;

router.get('/update', check_admin_login, async (req, res, next) => {

  let _token = req.query.token;
  let _action = req.query.action;

  if (!(_token && _action)) {
    // lack param
    res.render('error');
  } else {
    if (_action === 'kickout') {
      // kick out user
      await user_model.findOneAndUpdate({ token: _token }, { state: 'pending' });
      res.redirect('back');

    } else if (_action === 'remove') {
      // remove user
      await user_model.remove({ token: _token }).exec();
      res.redirect('back');

    } else {
      // undefined action
      // do nothing and return
      res.redirect('back');
    }
  }
  
});

module.exports = router
