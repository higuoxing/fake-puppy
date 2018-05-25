const user_model = require('../model/user');

const _get_all_users = async () => {
  let users = await user_model.find({
    '$or': [
      { state: 'activate' },
      { state: 'pending' } ]
  });
  return users;
}

const _get_active_users = async () => {
  let users = await user_model.find({
    state: 'activate'
  });
  return users;
}

const _remove_specific_user = async (user) => {
  try {
    await user_model.remove(user);
    return true;
  } catch (e) {
    return false;
  }
}

const _kickout_specific_user = async (user) => {
  try {
    await user_model.findOneAndUpdate(user, {
      mac_addr : ''         ,
      ip_addr  : ''         ,
      state    : 'pending'  ,
      gw_id    : ''         ,
      incoming : 0          ,
      outgoing : 0
    });
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = {
  get_all_users         : _get_all_users,
  get_active_users      : _get_active_users,
  remove_specific_user  : _remove_specific_user,
  kickout_specific_user : _kickout_specific_user,
}
