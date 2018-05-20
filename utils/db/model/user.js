const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fake-puppy');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', (callback) => {
  console.log('connection success');
});

// construct schema
const user_schema = new mongoose.Schema({
  mac_addr: { type: String },
  ip_addr: { type: String },
  token: { type: String, unique: true },       // token
  state: { type: String },                     // activate
  gw_id: { type: String },
  incoming: [ Number ],
  outgoing: [ Number ]
});

const user_model = mongoose.model('user', user_schema, 'user');

module.exports = user_model;
