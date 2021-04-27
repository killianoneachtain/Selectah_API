var express = require('express');
var router = express.Router();
var Discogs = require('disconnect').Client;
const cors = require('cors');
const fs = require('fs');
var db = new Discogs().database();
const tracks = require('../models/release')

var USER = express();

//Import the mongoose module
var mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = 'mongodb+srv://21tcqbg73uip45jv7bhr3p6za:MoW@x057xx@selectah.jcl8g.mongodb.net/selectah?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


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

/* GET releases track listing. */
router.get('/release/:releaseId', cors(), function(req, res, next) {

  var release = req.params.releaseId;
  console.log("Release_id", release);
  var exists = false;
  Release.count({_id: release}, function (err, count){ 
    if(count>0){
        console.log("It Does Exist");
        exists = true;
    }
}); 
  

  if(exists == false)
  {   var dis = new Discogs('MyUserAgent/1.0', {userToken: 'lYVtKyeISQGrTaFWvhONqkFfvbexIAIsrNiJhvAf'});
      var stuff = "";
      db.getRelease(req.params.releaseId, function(err, data)
      { 
          stuff=res.json(data);
          res.json(data);
      });   

      USER.post('/stuff', (req, res, next) => {
        const release = new Release({
          discogsReleaseID: req.params.releaseId,
          artist: stuff.artist,
          title: stuff.title,   
          updated: stuff.date_changed,
          tracklist: stuff.tracklist
        });
        thing.save().then(
          () => {
            res.status(201).json({
              message: 'Post saved successfully!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      }); 
      
  }
  else
  { 
    console.log('The release DOES exist')
  }  
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