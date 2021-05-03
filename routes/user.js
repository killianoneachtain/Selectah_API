var express = require('express');
const cors = require('cors');
const fs = require('fs');
const Release = require('../models/release')
const mongoUtil = require('../utilities/mongo');

//var selectah_db = app.mongo.getDb();

var router = express.Router();
var Discogs = require('disconnect').Client;
var db = new Discogs().database();


/* GET users listing. */
router.get('/', cors(), function(req, res, next) {
  res.render('user', { title: 'USER : Killian' });
});

router.get('/pages', cors(), function(req, res, next) {  
  var col = new Discogs({userToken: 'lYVtKyeISQGrTaFWvhONqkFfvbexIAIsrNiJhvAf'}).user().collection();

  col.getReleases('konsouloz', 0, {per_page:50, sort:"added"},
  function(err, data){
      //Pages =data.pagination;
      //console.log("Pages" , Pages);           
      res.json(data.pagination);         
  });  
});

router.get('/collection', cors(), function(req, res, next) {  
    var col = new Discogs({userToken: 'lYVtKyeISQGrTaFWvhONqkFfvbexIAIsrNiJhvAf'}).user().collection();
  
    col.getReleases('konsouloz', 0, {per_page:50, sort:"added"},
    function(err, data){  
        res.json(data);         
    });  
});

router.get('/collection/:pageNumber', cors(), function(req, res, next) {  
  var col = new Discogs({userToken: 'lYVtKyeISQGrTaFWvhONqkFfvbexIAIsrNiJhvAf'}).user().collection();

  console.log(`Page number : ${req.params.pageNumber}`)
  col.getReleases('konsouloz', 0, {per_page:50, sort:"added", page:req.params.pageNumber},
  function(err, data){  
      res.json(data);         
  });  
});

/* GET releases track listing. */ 
   router.get('/release/:releaseId', cors(), function(req, res, next) 
   {
    var dis = new Discogs('MyUserAgent/1.0', {userToken: 'lYVtKyeISQGrTaFWvhONqkFfvbexIAIsrNiJhvAf'});

    console.log("The release ID is : ",req.params.releaseId);
    var releaseData = [];

      db.getRelease(req.params.releaseId, async function(err, data){ 
          releaseData = await data;
          console.log('Release Data is : ', releaseData.id);


          data = await Release.findByDiscogsID(releaseData.id);
          
          //          var checker = db.collection( 'users' ).find();
         

          //check if the release id is in the mongo db
          // if it is return that one
          // if not then create an entry for the release.


          res.json(data);
          
    });     
    
  });



router.get('/genres/', cors(), function(req, res, next) {
    var genres = [ {"genres": [      
      { id: 1, name:"Electronic" },
      { id: 2, name:"Hip Hop" },
      { id: 3, name:"Rock" },
      { id: 4, name:"Rap" },
      { id: 6, name:"Funk / Soul" },
      { id: 7, name:"Latin" },
      { id: 8, name:"Pop" },
      { id: 9, name:"Jazz" }
        ]
      }
    ];  
    res.json(genres[0]);    
  });  


module.exports = router;