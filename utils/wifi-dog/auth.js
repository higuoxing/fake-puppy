const user_model = require('../db/model/user');

const _auth = async (auth_req_msg) => {

  // processing req
  if (auth_req_msg.stage === 'login') {
    // auth branch
    let user = await user_model.findOne({ token: auth_req_msg.token }).exec();
    if (user) {
      if (user.state === 'pending') {
        // token not taken return 1
        // update db
        let _user_update = {
          mac_addr: auth_req_msg.mac,
          ip_addr: auth_req_msg.ip,
          state: 'activate',

          // initialise array
          incoming: [ parseInt(auth_req_msg.incoming) ],
          outgoing: [ parseInt(auth_req_msg.outgoing) ],

          gw_id: auth_req_msg.gw_id
        }
        await user_model.findOneAndUpdate({ token: auth_req_msg.token }, _user_update).exec();
        return 'Auth: 1';
      } else {
        return 'Auth: 0';
      }
    } else {
      // token has been taken
      return 'Auth: 0';
    }
  } else if (auth_req_msg.stage === 'counters') {
    // counters branch
    // update db and return 1;
    let user = await user_model.findOne({ token: auth_req_msg.token }).exec();
    if (user) {
      if (user.state === 'activate') {
        // if user is active
        await user_model.findOneAndUpdate(
          { token: auth_req_msg.token },
          { '$push': { incoming: auth_req_msg.incoming,
                       outgoing: auth_req_msg.outgoing }
        }).exec();
        return 'Auth: 1';
      } else {
        // if user is pending
        return 'Auth: 0';
      }
    } else {
      return 'Auth: 0';
    }
  } else if (auth_req_msg.stage === 'logout') {
    let user = await user_model.findOne({ token: auth_req_msg.token }).exec();
    if (user) {
      let _user_update = {
        mac_addr: '',
        ip_addr: '',
        state: 'pending',

        // clear dataflow log
        incoming: [ /* empty array */ ],
        outgoing: [ /* empty array */ ],
        gw_id: ''
      }
      await user_model.findOneAndUpdate({ token: auth_req_msg.token }, _user_update).exec();
      return 'Auth: 0';
    }
  } else {
    // not known return 0
    return 'Auth: 0';
  }

}

module.exports = {
  auth: _auth
}
