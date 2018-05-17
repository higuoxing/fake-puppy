const admin_model = require('../db/model/admin');

const _check_admin = async (user) => {
  let admin = await admin_model.findOne(user).exec();
  if (admin) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  check_admin: _check_admin
}
