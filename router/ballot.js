var express = require('express');
var router = express.Router();
var ballot = require('../module/ballot');

router.post('/', ballot);

module.exports = router;