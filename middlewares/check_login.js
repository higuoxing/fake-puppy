const admin_model = require('../utils/db/model/admin');

module.exports = {
  // check admin login
  check_admin_login: function checkAdminLogin(req, res, next) {
    if (req.session.user.role != 'admin') {
      req.flash('error', 'Sorry, you have not signed in :(');
      return res.redirect('/admin/login');
    }
    next();
  }
}
