module.exports = (app) => {
  require('./api/wifi-dog/index')(app);      // wifidog API
  require('./admin/index')(app);
}
