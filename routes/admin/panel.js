const express           = require('express');
const router            = express.Router();
const check_admin_login = require('../../middlewares/check_login').check_admin_login;
const get_index_info    = require('../../utils/admin/panel').get_index_info;

router.get('/', check_admin_login, async (req, res, next) => {
  let _admin = req.session.user;
  let _index_info = await get_index_info(_admin);
  res.render('admin/panel', { index_info: _index_info });
});

module.exports = router
