var express = require('express');
const cors = require('cors');
const fs = require('fs');
const Release = require('../models/release')
const mongoUtil = require('../utilities/mongo');
require('dotenv').config();

//var selectah_db = app.mongo.getDb();

var router = express.Router();
var Discogs = require('disconnect').Client;
var db = new Discogs().database();

/* GET Check a Username exists on Discogs */
router.get('/check/:name', cors(), function(req,res, next) {
  var col = new Discogs({userToken: process.env.Discogs_App_Token}).user();
  
  //console.log("The name to check is ", req.params.name)
  col.getProfile(req.params.name, function(err,data) {
    res.json(data);
  } )
})

/* GET users pagination details. */
router.get('/pagination/:userName/', cors(), function(req, res, next) {  
  var col = new Discogs({userToken: process.env.Discogs_App_Token}).user().collection();

  col.getReleases(req.params.userName, 0, {per_page:50, sort:"added"},
  function(err, data){
      //Pages =data.pagination;
      //console.log("Pages for : ", req.params.userName);           
      res.json(data.pagination);         
  });  
});


/* GET users collection by page number  */
router.get('/:userName/collection/:pageNumber', cors(), function(req, res, next) {  
  var col = new Discogs({userToken: process.env.Discogs_App_Token}).user().collection();

  //console.log(`Page number : ${req.params.pageNumber}`)
  col.getReleases(req.params.userName, 0, {per_page:50, sort:"added", page:req.params.pageNumber},
  function(err, data){  
      res.json(data);         
  });  
});

/* GET releases track listing by Discogs Release id.
 * If the Discogs Release ID is found in the Selecta: Releases
 * database, then the Atlas record is returned to the app.
*/ 
   router.get('/release/:releaseId', cors(), async function(req, res, next) 
   {
    var dis = new Discogs('MyUserAgent/1.0', {userToken: process.env.Discogs_App_Token});

    //console.log("The release ID is : ",req.params.releaseId);
    var releaseData = [];

    data = await Release.findByDiscogsID(req.params.releaseId);
    console.log("data for initial check", data)
    
    if(data === null)
      {
          db.getRelease(req.params.releaseId, async function(err, data){ 
          releaseData = await data;
          //console.log('Release Data is : ', releaseData);
          data = await Release.findByDiscogsID(releaseData.id);
          //console.log("data is ",data); 
          if(data == null)
            {
          
            data = releaseData;
            console.log("data is", data);


           /* data.tracklist.forEach(function(track) {
              var BPMArray = [{ user : "", BPM: 0 }] 
              this.track.push(BPMArray)}) */

            const newRelease = new Release({
              Discogs_id: data.id,
              artists: data.artists,
              artists_sort: data.artists_sort,
              date_changed: data.date_changed,
              master_id: data.master_id,
              title: data.title,
              genres: data.genres,
              styles: data.styles,
              tracklist: data.tracklist
            });
              let release = await newRelease.save();
              console.log("New Release Added", release);
            }
            res.json(data);          
          });  
      }
      else 
      { 
        res.json(data);
      }       
  });

router.get('/genres', cors(), function(req, res, next) {
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
    res.json(genres.genres);    
  });  


module.exports = router;