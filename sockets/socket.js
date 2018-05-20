module.exports = {
  socket_router: (socket) => {

    // loading page signal
    socket.emit('news', { load: 'loading-page' });

    // socket router
    
  }
}
