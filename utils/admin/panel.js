const user_model = require('../db/model/user');
const admin_model = require('../db/model/admin');

const _get_index_info = async () => {

  let _indef_info = {
    active_user: await user_model.find({ state: 'activate' }).exec(),
    device_info: await admin_model.findOne({ username: 'admin' }).exec(),
    all_user: await user_model.find({ '$or': [{ state: 'activate' }, { state: 'pending' }] }).exec()
  }

  return _indef_info;
}

module.exports = {
  get_index_info: _get_index_info
}
