module.exports = (app) => {
  // wifidog API router
  app.use('/wifidog/auth'  ,    require('./auth'  ));
  app.use('/wifidog/login' ,    require('./login' ));
  app.use('/wifidog/portal',    require('./portal'));
  app.use('/wifidog/ping'  ,    require('./ping'  ));
}
