const express               = require('express');
const router                = express.Router();
const check_admin_login     = require('../../../middlewares/check_login').check_admin_login;
const kickout_specific_user = require('../../../utils/db/access/user').kickout_specific_user;
const remove_specific_user  = require('../../../utils/db/access/user').remove_specific_user;

router.get('/update', check_admin_login, async (req, res, next) => {

  let _token = req.query.token;
  let _action = req.query.action;

  if (!(_token && _action)) {
    // lack param
    res.render('error');
  } else {
    if (_action === 'kickout') {
      // kick out user
      let status = await kickout_specific_user({ token: _token });
      if (status) {
        // success
        // FIXME
      } else {
        // failed
      }
      res.redirect('back');
    } else if (_action === 'remove') {
      // remove user
      let status = await remove_specific_user({ token: _token });
      if (status) {
        // success
      } else {
        // failed
      }
      res.redirect('back');
    } else {
      // undefined action
      // do nothing and return
      res.redirect('back');
    }
  }
});

module.exports = router
