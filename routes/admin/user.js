const express                      = require('express');
const router                       = express.Router();
const check_admin_login            = require('../../middlewares/check_login').check_admin_login;
const _socket_conf                 = require('../../configs/default').socket_conf;
const get_active_users             = require('../../utils/db/access/user').get_active_users;
const get_all_users                = require('../../utils/db/access/user').get_all_users;
const get_users_of_specific_device = require('../../utils/db/access/user').get_users_of_specific_device;

// get active users
router.get('/', check_admin_login, async (req, res, next) => {
  if (req.query.sort === 'active') {
    let _users = await get_active_users();
    res.render('admin/user', {
      users        : _users       ,
      socket_conf  : _socket_conf ,
      live_display : true         ,
    });
  } else if (req.query.sort === 'all') {
    let _users = await get_all_users();
    res.render('admin/user', {
      users        : _users       ,
      socket_conf  : _socket_conf ,
      live_display : false        ,
    });
  } else if (req.query.sort === 'device') {
    let _users = await get_users_of_specific_device({
      gw_id        : req.query.gw_id
    });
    res.render('admin/user', {
      users        : _users       ,
      socket_conf  : _socket_conf ,
      live_display : true         ,
    });
  }
});

module.exports = router
