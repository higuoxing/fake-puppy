const _on_user_mount = require('../utils/socket/user')._on_user_mount;
const _on_device_mount = require('../utils/socket/device')._on_device_mount;

module.exports = {
  socket_router: (socket) => {

    // socket should be registered here
    let admin = socket.request.session.user;
    if (admin) {
      if (admin.role === 'admin') {
        socket.on('user-connection',   (data) => { _on_user_mount(data, socket, admin  ); });
        socket.on('device-connection', (data) => { _on_device_mount(data, socket, admin); });
      }
    }
  }
}
