var express = require('express');
var router = express.Router();
var Discogs = require('disconnect').Client;
const cors = require('cors');
const fs = require('fs');
var db = new Discogs().database();

var dis = new Discogs({
	consumerKey: 'rSlgSvPFNYXtkYClvjLs', 
	consumerSecret: 'QRabRHFedozJinKOvopMUCKeCepaCJLn'
});

var collectorsItems= [];
var noOfPages=0;
var completeCollection=[];

/* GET users listing. */
router.get('/', cors(), function(req, res, next) {
  res.render('user', { title: 'USER : Killian' });
});

router.get('/collection', cors(), function(req, res, next) {  
  var col = new Discogs({userToken: 'lYVtKyeISQGrTaFWvhONqkFfvbexIAIsrNiJhvAf'}).user().collection();
  
  col.getReleases('konsouloz', 0, {per_page:50},
   function(err, data){
        /*console.log(data);        
        noOfPages =data.pagination.pages;        
        console.log("Number of Pages: "+noOfPages);
        if(parseInt(noOfPages) > 1)
        {
          for(i = 2;i<=noOfPages;i++)
          {
            col.getReleases('konsouloz', 0, {page: i,per_page:500},
            function(err, data)
            {
              collectorsItems.push(data.releases);
            });
          }
        } else{ collectorsItems.push(data.releases)}
    });   
  res.json(collectorsItems);*/
 
     console.log(data);
     res.json(data.releases);
   });
});

/* GET releases track listing. */
router.get('/release/:releaseId', cors(), function(req, res, next) {
  var dis = new Discogs('MyUserAgent/1.0', {userToken: 'lYVtKyeISQGrTaFWvhONqkFfvbexIAIsrNiJhvAf'});
   db.getRelease(req.params.releaseId, function(err, data){
    //console.log(data);
    res.json(data);
  });  
});


module.exports = router;