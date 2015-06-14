var facebook = require('./facebook');
var database = require('./database');

module.exports = function (req, res, next) {
	var fbData = '';
	facebook({
		fbtoken: req.body.fbtoken,
		LoginCallback: function(body) {
			if(body.vaild) {
				fbData = body.data;
				database.query('SELECT * FROM `user` WHERE `id` = ?', new Array(body.data.id), queryCallback)
			}
			else
				res.status(412).json({
					error: 'Facebook token fail.'
				});
		}
	});

	var queryCallback = function(err, row, field) {
		if (err)
			res.status(500).json({
				error: 'Internal error'
			})
		else if(row.length != 0)
			res.status(412).json({
				messages: '已經抽籤過了。',
				number: row[0].ballotNumber
			});
		else 
		{
			var ballotNumber = Math.random();
			var queryStatment = 'INSERT INTO `user` (id, email, name, ballotNumber) Value (?, ?, ?)';
			var parameter = new Array(fbData.id, fbData.email, fbData.name, ballotNumber);
			database.query(queryStatment, parameter, function(err, row, field) {
				if(!err)
					res.status(200).json({
						messages: '抽籤成功！',
						number: ballotNumber
					});
			});
		}
	}
}