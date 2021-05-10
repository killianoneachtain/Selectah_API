var express = require('express');
const cors = require('cors');
const fs = require('fs');
var router = express.Router();

router.get('/change_metadata/:user_id/:verified_name', cors(), function(req, res, next) {  
  
   console.log("Here trying to get auth0 stuff");
   console.log("User :", req.params.user_id);
   console.log("New Collection Name :", req.params.verified_name);  

   const User = encodeURIComponent(req.params.user_id)

   //var request = require("request");
   var axios = require("axios").default;

   var apiToken = process.env.Auth0APIKey

   var options = {
   method: 'PATCH',
   url: `https://selectah-app.eu.auth0.com/api/v2/users/${User}`,
   headers: {authorization: `Bearer ${apiToken}`, 'content-type': 'application/json'},
   data: {
      user_metadata: {
         "discogs_username" : req.params.verified_name
      }
   }
   };

   axios.request(options)
      .then(function (response) {
         console.log(response.data);
            res.json(response.data)
      }).catch(function (error) {
            console.error("Auth0 API Error : ", error);
         });   

  });
  
  module.exports = router;