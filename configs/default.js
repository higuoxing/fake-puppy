module.exports = {
  port        : 3000,
  session     : {
    key              : 'fake-puppy',              // session key
    secret           : 'fake-puppy',              // session secret
    resave           : true,                      // resave
    maxAge           : 2592000000,                // session max age
  },
  socket_conf : {
    addr             : 'http://localhost:3000',
    emit_user_data   : 1000,                      // emit user data per 3000us
    emit_device_data : 1000                       // emit device data per 3000us
  }
}
