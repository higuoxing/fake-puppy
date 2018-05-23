module.exports = (app) => {
  // wifidog API router
  app.use('/wifidog/auth'  ,    require('./auth'  ));    // API: /wifidog/auth
  app.use('/wifidog/login' ,    require('./login' ));    // API: /wifidog/login
  app.use('/wifidog/portal',    require('./portal'));    // API: /wifidog/portal
  app.use('/wifidog/ping'  ,    require('./ping'  ));    // API: /wifidog/ping
}
