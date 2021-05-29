var express = require('express');
var router = express.Router();
var Discogs = require('disconnect').Client;

app.get('/callback', function(req, res){
	var oAuth = new Discogs(requestData).oauth();
	oAuth.getAccessToken(
		req.query.oauth_verifier, // Verification code sent back by Discogs
		function(err, accessData){
			// Persist "accessData" here for following OAuth calls 
			res.send('Received access token!');
		}
	);
});
module.exports =router;