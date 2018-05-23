module.exports = (app) => {
  require('./api/wifi-dog/index')(app);      // wifidog API
  require('./api/admin/index')(app);         // admin API
  require('./admin/index')(app);             // render page
}
