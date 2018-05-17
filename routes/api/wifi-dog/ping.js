const express = require('express');
const router = express.Router();
const pong = require('../../../utils/wifi-dog/pong').pong;

router.get('/', async (req, res, next) => {
  let ping_msg = req.query;
  let pong_msg = await pong(ping_msg);
  res.send(pong_msg);
});

module.exports = router
