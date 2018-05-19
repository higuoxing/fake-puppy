const user_model = require('../db/model/user');
const admin_model = require('../db/model/admin');

const _get_index_info = async () => {
  let user_info = await user_model.find({ state: 'activate' }).exec();
  let device_info = await admin_model.find({ username: 'admin' }).exec();
  return { total_user: user_info.length, total_device: device_info.length };
}

module.exports = {
  get_index_info: _get_index_info
}
