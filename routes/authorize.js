var express = require('express');
var router = express.Router();
var Discogs = require('disconnect').Client;
const cors = require('cors');

router.get('/', cors(), function(req, res,next){
        
	var oAuth = new Discogs().oauth();
	oAuth.getRequestToken(
		'rSlgSvPFNYXtkYClvjLs', 
		'QRabRHFedozJinKOvopMUCKeCepaCJLn', 
		'https://selectah.vercel.app', 
		function(err, requestData){
			// Persist "requestData" here so that the callback handler can 
			// access it later after returning from the authorize url
			//res.redirect(requestData.authorizeUrl);
			res.json(requestData);
		}
	);
});
module.exports =router;