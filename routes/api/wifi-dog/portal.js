const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
  res.render('wifi-dog/portal');
});

module.exports = router
