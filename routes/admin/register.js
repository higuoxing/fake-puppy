const express = require('express');
const router = express.Router();
const admin_model = require('../../utils/db/model/admin');
const gen_salt = require('../../utils/admin/encrypt').gen_salt;

router.get('/', async (req, res, next) => {
  if ((await admin_model.find()).length > 0) {
    // admin exist
    res.redirect('/admin/login');
  } else {
    // admin is not existed
    let _salt = await gen_salt();
    res.render('admin/register', { salt: _salt, sess_id: req.sessionID });
  }
});

module.exports = router
