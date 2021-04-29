var express = require('express');
var router = express.Router();
var Discogs = require('disconnect').Client;
const cors = require('cors');
const fs = require('fs');
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
     db.getRelease(req.params.releaseId, function(err, data){ 
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