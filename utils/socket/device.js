const admin_model  = require('../db/model/admin');
const _socket_conf = require('../../configs/default').socket_conf;

module.exports = {
  _on_device_mount: (data, socket, _username) => {
    let send_data_interval = setInterval(async () => {
      // set time interval
      let _admin = await admin_model.findOne({ username: _username }).exec();
      if (_admin) {
        // if active users exist
        socket.emit('device-data', { devices: _admin.devices });
      } else {
        // do nothing
      }
    }, _socket_conf.emit_device_data);

    socket.on('disconnect', () => {
      // stop interval
      clearInterval(send_data_interval);
    });
  },
}
