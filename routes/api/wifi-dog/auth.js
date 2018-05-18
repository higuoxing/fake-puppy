const express = require('express');
const router = express.Router();
const auth = require('../../../utils/wifi-dog/auth').auth;

router.get('/', async (req, res, next) => {
  let auth_req_msg = req.query;
  let auth_res_msg = await auth(auth_req_msg);
  res.send(auth_res_msg);
});

module.exports = router
