const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fake-puppy');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', (callback) => {
  console.log('connection success');
});

const device_schema = new mongoose.Schema({
  gw_id: { type: String, require: true, unique: true },
  sys_uptime: { type: Number },
  sys_memfree: { type: Number },
  sys_load: { type: Number },
  wifidog_uptime: { type: Number }
})

// construct schema
const admin_schema = new mongoose.Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  devices: [ device_schema ]
});

const admin_model = mongoose.model('admin', admin_schema, 'admin');

module.exports = admin_model;
