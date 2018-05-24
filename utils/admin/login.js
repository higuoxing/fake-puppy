const admin_model = require('../db/model/admin');
const crypto = require('crypto');


const _check_admin = async (user) => {
  const md5 = crypto.createHash('md5');
  let admin = await admin_model.findOne({ username: user.username });
  if (admin) {
    // admin exist
    let _check_sum = md5.update(user.password + admin.salt).digest('hex').toString();
    if (_check_sum === admin.password) {
      // login successful
      return 'auth';
    } else {
      return 'not-permitted';
    }
  } else {
    return 'not-permitted';
  }
}

module.exports = {
  check_admin: _check_admin
}
