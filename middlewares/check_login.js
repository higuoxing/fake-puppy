module.exports = {
  // check admin login
  check_admin_login: function checkAdminLogin(req, res, next) {
    if (req.session.user != 'admin') {
      req.flash('error', 'Sorry, you have not signed in :(');
      return res.redirect('/admin/login');
    }
    next();
  }
}
