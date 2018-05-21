const _on_user_mount = require('../utils/socket/user')._on_user_mount;
const _on_device_mount = require('../utils/socket/device')._on_device_mount;

module.exports = {
  socket_router: (socket) => {

    // socket should be registered here
    socket.on('user-connection',   (data) => { _on_user_mount(data, socket);   });
    socket.on('device-connection', (data) => { _on_device_mount(data, socket); });

  }
}
