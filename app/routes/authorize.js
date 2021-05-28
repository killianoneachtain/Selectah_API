var express = require('express');
var router = express.Router();
var Discogs = require('disconnect').Client;
const cors = require('cors');

var requestData;
var accessData;

router.get('/', cors(), function(req, res,next){
        
	var oAuth = new Discogs().oauth();
	oAuth.getRequestToken(
		'rSlgSvPFNYXtkYClvjLs', 
		'QRabRHFedozJinKOvopMUCKeCepaCJLn', 
		'http://localhost:3000', 
		function(err, requestData){
			// Persist "requestData" here so that the callback handler can 
			// access it later after returning from the authorize url
			//res.redirect(requestData.authorizeUrl);
			res.json(requestData);
			requestData = requestData;			
		}
	);
});

router.get('/callback', cors(), function(req, res){
	var oAuth = new Discogs(requestData).oauth();
	oAuth.getAccessToken(
		req.query.oauth_verifier, // Verification code sent back by Discogs
		function(err, accessData){
			// Persist "accessData" here for following OAuth calls 
			//res.send('Received access token!');
			res.json(accessData);
			accessData = accessData;
		}
	);
});

router.get('/identity', cors(),function(req, res){
	var dis = new Discogs(accessData);
	dis.getIdentity(function(err, data){
		//res.send(data);
		res.json(data);
	});
});

module.exports =router;