const user_model = require('../model/user');

// create a token
const _insert_one_user = async (user) => {
  try {
    await user_model.create(user);
    return true;
  } catch (e) {
    return false;
  }
}

// get all users (active and pending)
const _get_all_users = async () => {
  let users = await user_model.find({
    '$or': [
      { state: 'active' },
      { state: 'pending' } ]
  });
  return users;
}

// get all users (active)
const _get_active_users = async () => {
  let users = await user_model.find({
    state: 'active'
  });
  return users;
}

// get all users of specific device
const _get_users_of_specific_device = async (device) => {
  let users = await user_model.find({
    gw_id : device.gw_id
  });
  return users;
}

// get all users (pending)
const _get_pending_users = async () => {
  let users = await user_model.find({
    state: 'pending'
  });
  return users;
}

// remove a specific user
const _remove_specific_user = async (user) => {
  try {
    await user_model.remove(user);
    return true;
  } catch (e) {
    return false;
  }
}

// kick out one user by token
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
  insert_one_user              : _insert_one_user              ,
  get_all_users                : _get_all_users                ,
  get_active_users             : _get_active_users             ,
  get_users_of_specific_device : _get_users_of_specific_device ,
  get_pending_users            : _get_pending_users            ,
  remove_specific_user         : _remove_specific_user         ,
  kickout_specific_user        : _kickout_specific_user        ,
}
