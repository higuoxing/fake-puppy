const user_model = require('../db/model/user');
const admin_model = require('../db/model/admin');
const get_all_users = require('../db/access/user').get_all_users;

const _get_index_info = async (user) => {

  let index_info = {
    active_users: await user_model.find({ state: 'activate' }).exec(),
    all_devices: (await admin_model.findOne(user)).devices,
    all_users: await get_all_users()
  }
  
  return index_info;
}

module.exports = {
  get_index_info: _get_index_info
}
