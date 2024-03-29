var express = require('express');
const cors = require('cors');
const fs = require('fs');
const Release = require('../models/release')
const TrackAnalysis = require('../models/trackAnalysis')
const mongoUtil = require('../utilities/mongo');
require('dotenv').config();


var router = express.Router();
var Discogs = require('disconnect').Client;
const { title } = require('process');
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
router.get('/pagination/:userName/:perPage/:orderBy', cors(), function(req, res, next) {  
  var col = new Discogs({userToken: process.env.Discogs_App_Token}).user().collection();

  col.getReleases(req.params.userName, 0, {per_page: req.params.perPage, sort:req.params.orderBy},
  function(err, data){               
      res.json(data.pagination);         
  });  
});


/* GET users collection by page number  */
router.get('/:userName/collection/:orderBy/:perPage/:pageNumber', cors(), function(req, res, next) {  
  var col = new Discogs({userToken: process.env.Discogs_App_Token}).user().collection();
  
  col.getReleases(req.params.userName, 0, {per_page:req.params.perPage, sort: req.params.orderBy, page:req.params.pageNumber},
  function(err, data){  
      res.json(data);         
  });  
});

router.get('/trackAnalysis/:releaseID', cors(), async function(req, res) {  
  console.log(`Release ID for TrackAnaylsis : ${req.params.releaseID}`)  

  var data = await TrackAnalysis.findByRelease(req.params.releaseID)
  console.log("Track Analysis Data :", data)
  res.json(data)         
 
});

/* GET releases track listing by Discogs Release id.
 * If the Discogs Release ID is found in the Selecta: Releases
 * database, then the Atlas record is returned to the app.
*/ 
   router.get('/release/:releaseID', cors(), async function(req, res, next) 
   {
    //var dis = new Discogs('MyUserAgent/1.0', {userToken: process.env.Discogs_App_Token});
    var releaseData = [];

    data = await Release.findByDiscogsID(req.params.releaseID);
    //console.log("data for initial check", data)
    
    if(data === null)
      {
          db.getRelease(req.params.releaseID, async function(err, data){ 
          releaseData = await data
          
          data = await Release.findByDiscogsID(releaseData.id)          

          if(data == null)
            {
          
              data = releaseData;
              console.log("data is", data);
              data.tracklist.forEach(async function(track) {
                
                const newTrackAnalysis = new TrackAnalysis({
                  releaseID: req.params.releaseID, 
                  position: track.position,
                  title: track.title,
                  user: [],
                  BPM: 0,
                  BPMConfidence: 1,
                  Key: "D",
                  KeyConfidence: 1,
                  Date: Date.now()
                });
                var tracks = await newTrackAnalysis.save()
                console.log("New Audio analysis added for ", data.id, " : ", tracks)                              
            }) 

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
              var release = await newRelease.save();
              console.log("New Release Added", release);
            }
            res.json(data);          
          });  
      }
      else 
      { 
        console.log("This is Selectah Data returned", data)
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