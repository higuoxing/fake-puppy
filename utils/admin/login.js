const admin_model        = require('../db/model/admin');
const crypto             = require('crypto');
const check_admin_exist  = require('../db/access/admin').check_admin_exist;
const get_the_only_admin = require('../db/access/admin').get_the_only_admin;

const _check_admin = async (user) => {
  const md5 = crypto.createHash('md5');
  let check_admin = await check_admin_exist();
  if (check_admin) {
    // admin exist
    let admin = await get_the_only_admin();
    let _check_sum = md5.update(admin.password + user.sess_id).digest('hex').toString();
    if (_check_sum === user.password) {
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
