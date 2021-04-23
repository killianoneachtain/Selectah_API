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
var completeCollection="";

/* GET users listing. */
router.get('/', cors(), function(req, res, next) {
  res.render('user', { title: 'USER : Killian' });
});

router.get('/collection', cors(), function(req, res, next) {  
    var col = new Discogs({userToken: 'lYVtKyeISQGrTaFWvhONqkFfvbexIAIsrNiJhvAf'}).user().collection();
  
    col.getReleases('konsouloz', 0, {per_page:50, sort:"added"},
    function(err, data){
        noOfPages =data.pagination.pages;   
        console.log(err);
        console.log(noOfPages);   
        //completeCollection = getAllReleases(parseInt(noOfPages))
        res.json(data); 
        //res.json(data.releases);
    });  
});

function getAllReleases(pages)
{
     //noOfPages =data.pagination.pages;   
        //console.log(noOfPages);
  var col = new Discogs({userToken: 'lYVtKyeISQGrTaFWvhONqkFfvbexIAIsrNiJhvAf'}).user().collection();

  var strings="";
  var news="";
  var together = "";
  console.log(" I is : ", pages);

    for(i = 1;i<=pages;i++)
    {
    //console.log("length of strings",strings.length);
     col.getReleases('konsouloz', 0, {page: `${i}`, per_page:50},
    function(err, data){
        news = JSON.stringify(data.releases); 
        news = news.substring(1);
        var n = news.lastIndexOf("]");
        news = news.substring(0,n) + ',';
        console.log("length of news now is : ",news.length);     
        strings += news;   
        console.log("length of strings",strings.length); 
        
        console.log("i : ", i);
        console.log("pages", pages);
        
        if(i>pages)
        {
          var l = strings.length;
          var set = `[${strings}]`;
          strings = JSON.parse(set);
          console.log("SET : ",strings);
        } 
        });  
    } 
    return strings;  
   };

   /* GET releases track listing. */
router.get('/release/:releaseId', cors(), function(req, res, next) {
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