const express = require('express');
const router = express.Router();

// render login page
router.get('/', async (req, res, next) => {
  res.render('wifi-dog/login');
});

module.exports = router
