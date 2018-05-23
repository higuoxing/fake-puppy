module.exports = (app) => {
  // wifidog API router
  app.use('/api/admin/login'  ,    require('./login'  ));
  app.use('/api/admin/user'   ,    require('./user'   ));
  app.use('/api/admin/device' ,    require('./device' ));
}
