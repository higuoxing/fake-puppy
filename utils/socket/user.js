module.exports = {
  _on_user_mount: (data, socket) => {
    let send_data_interval = setInterval(() => {
      // set time interval
      console.log('interval');
    }, 500);
    
    socket.on('disconnect', () => {
      // stop interval
      clearInterval(send_data_interval);
    });
  },
}
