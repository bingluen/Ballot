var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/*', function(req, res, next) {
	var p = (req.path == '/' ? '/index.html' : req.path);
	res.status(200).sendFile(path.join(__dirname, '../public', p));
});

module.exports = router;