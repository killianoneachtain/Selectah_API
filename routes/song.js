var express = require('express');
var router = express.Router();
const cors = require('cors');
const fs = require('fs');
const SpotifyWebApi = require('spotify-web-api-node');
const Track = require('../models/track');
require('dotenv').config();
const matching = require('../utilities/matching')
const Release = require('../models/release')

/* GET Track Audio Analysis */
router.get('/:userID/:artistName/:albumTitle/:trackTitle/:trackID', cors(), async function (req, res,next) {
  
  console.log("UserID : ", req.params.userID)
  console.log("Artist  :", req.params.artistName)
  console.log("Album Title :", req.params.albumTitle)
  console.log("Track title :", req.params.trackTitle)
  console.log("Track id :", req.params.trackID)

  let TrackName = req.params.trackTitle;
  let Mix = "";
  if(TrackName.includes("("))
  {
    let temp = TrackName.split('(')[0].trim();
    Mix = TrackName.split('(')[1].split(')')[0].trim();
    TrackName = temp.trim();
  }
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SpotifyClientID,
    clientSecret: process.env.SpotifyClientSecret
  });  

  var token="";
  // Retrieve an access token
  spotifyApi.clientCredentialsGrant().then(
    async function(data) {
      //console.log('The access token expires in ' + data.body['expires_in']);
      //console.log('The access token is ' + data.body['access_token']);          
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
      spotifyApi.getAudioAnalysisForTrack(`${req.params.trackID}`).then(
        async function(data) 
        {
            //console.log(data.body.track);
            console.log("BPM IS : ",Number((data.body.track.tempo).toFixed(0)));  
            console.log("Tempo Confidence IS : ",data.body.track.tempo_confidence);  
            console.log("Key  IS : ",data.body.track.key);
            console.log("Key confidence IS : ",data.body.track.key_confidence);   
 
            const newTrack = new Track({
              userID: req.params.userID,              
              artist: req.params.artistName,
              album: req.params.albumTitle,
              trackName: TrackName,
              mix: Mix,
              spotifyID: req.params.trackID
              });
              let trck = await newTrack.save();
              console.log("track saved : ", trck);

              // search the DB for the two tracsk
              let tracks = await Track.findByUserID(req.params.userID)

              let m1 = new matching(tracks, 0)
              console.log("m1 : ", m1)

              if(m1.matchCount == 4)
              { 
                console.log("We have a Match")
                var relID = ""
                if(tracks != null)
                {
                  tracks.forEach(function(rID) {
                    var release_id = rID.releaseID
                    if(release_id != null){
                      relID = release_id
                    }
                  })

                console.log("Release ID : ", relID)

                var thisRelease = await Release.findByDiscogsID(relID)
                console.log("Release : ", thisRelease)

                var tracklisting = thisRelease.tracklist;
                if(tracklisting != null)
                { 
                  tracklisting.forEach(function(track) {
                    var track_title = track.title                    
                    if(track_title === TrackName)
                    { 
                      console.log("The type of track is : ", typeof track)                     

                    }

                  })
                }

                }

              }
              
            //create
            
        })
       }).catch(function(err) {
          console.log('Something went wrong in GET Audio Analysis', err.message);
          });  
       
      },
      function(err) {
        console.log(
          'Something went wrong when retrieving an access token in the function gettingAudioAnalysis()',
          err.message
        );
      }
    );      

module.exports = router;

/*
function getSpotifyToken() 
{   
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SpotifyClientID,
    clientSecret: process.env.SpotifyClientSecret
  });
      
      var token="";

      // Retrieve an access token
      spotifyApi.clientCredentialsGrant().then(
        function(data) {
          console.log('The access token expires in ' + data.body['expires_in']);
          console.log('The access token is ' + data.body['access_token']);
      
          // Save the access token so that it's used in future calls
          token = spotifyApi.setAccessToken(data.body['access_token']);
          return token;
        },
        function(err) {
          console.log(
            'Something went wrong when retrieving an access token in the function getSpotifyToken()',
            err.message
          );
        }
      );
} 
*/