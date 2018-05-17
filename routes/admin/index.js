module.exports = (app)=> {
  app.use('/admin/login' ,   require('./login' ));
  app.use('/admin/panel' ,   require('./panel' ));
  app.use('/admin/qrcode',   require('./qrcode'));
}
