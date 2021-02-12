var express = require('express');
var router = express.Router();
var Discogs = require('disconnect').Client;

app.get('/identity', function(req, res){
	var dis = new Discogs(accessData);
	dis.getIdentity(function(err, data){
		res.send(data);
	});
});

module.exports =router;