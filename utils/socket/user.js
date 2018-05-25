const user_model = require('../db/model/user');
const _socket_conf = require('../../configs/default').socket_conf;

module.exports = {
  _on_user_mount: (data, socket, admin) => {
    let send_data_interval = setInterval(async () => {
      // set time interval
      let _active_user = await user_model.find({ state: 'active' }).exec();
      if (_active_user) {
        // if active users exist
        socket.emit('user-data-outgoing', { active_user: _active_user });
        socket.emit('user-data-incoming', { active_user: _active_user });
      } else {
        // do nothing
      }
    }, _socket_conf.emit_user_data);

    socket.on('disconnect', () => {
      // stop interval
      clearInterval(send_data_interval);
    });
  },
}
