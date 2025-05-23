const express = require('express');
// const checkPermission = require('./checkPermission');
const checkPermission = require('../middleware/checkPermission');
//  (try this if the above is wrong)


const router = express.Router();

router.get('/data', checkPermission('viewData'), (req, res) => {
  res.send('Sensitive data');
});

module.exports = router;
