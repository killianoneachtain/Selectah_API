var express = require('express');
var router = express.Router();
var Discogs = require('disconnect').Client;
const cors = require('cors');


app.get('/identity', cors(), function(req, res){
	var dis = new Discogs(accessData);
	dis.getIdentity(function(err, data){
		res.send(data);
	});
});

module.exports =router;