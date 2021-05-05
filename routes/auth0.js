var express = require('express');
const cors = require('cors');
const fs = require('fs');
var router = express.Router();

router.get('/auth0/:user_id', cors(), function(req, res, next) {  
  
   console.log("Here trying to get auth0 stuff");
   res.json();
  });
  
  module.exports = router;