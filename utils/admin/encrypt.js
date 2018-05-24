const crypto = require('crypto');

const _gen_salt = async () => {
  let current_date = (new Date()).valueOf().toString();
  let random = Math.random().toString();
  salt = crypto.createHash('sha1').update(current_date + random).digest('hex');
  return salt;
}

module.exports = {
  gen_salt: _gen_salt
}
