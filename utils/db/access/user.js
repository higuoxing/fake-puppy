const user_model = require('../model/user');

const _get_all_users = async () => {
  let users = await user_model.find({
    '$or': [
      { state: 'activate' },
      { state: 'pending' } ]
  });
  return users;
}



module.exports = {
  get_all_users: _get_all_users,
}
