var express = require('express');
var router = express.Router();
const cors = require('cors');
const fs = require('fs');
const SpotifyWebApi = require('spotify-web-api-node');
const Track = require('../models/track');
require('dotenv').config();
const matching = require('../utilities/matching')
const Release = require('../models/release')
const TrackAnalysis = require('../models/trackAnalysis')

/* GET Track Audio Analysis */
router.get('/match/:userID/:artistName/:albumTitle/:trackTitle/:trackID/:analysisID', cors(), async function (req, res,next) {
  
  console.log("UserID : ", req.params.userID)
  console.log("Artist  :", req.params.artistName)
  console.log("Album Title :", req.params.albumTitle)
  console.log("Track title :", req.params.trackTitle)
  console.log("Track id :", req.params.trackID)
  console.log("Analysis ID :", req.params.analysisID)

  var TrackName = req.params.trackTitle;
  var Mix = "";
  if(TrackName.includes("("))
  {
    var temp = TrackName.split('(')[0].trim();
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
      // Save the access token so that it's used in future calls
      await spotifyApi.setAccessToken(data.body['access_token']);

      await spotifyApi.getAudioAnalysisForTrack(`${req.params.trackID}`).then(
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
              source: "Spotify",
              spotifyID: req.params.trackID
              });
              var trck = await newTrack.save();
              //console.log("track saved : ", trck);

              // search the DB for the two tracsk
              var tracks = await Track.findByUserID(req.params.userID)

              var m1 = await new matching(tracks, 0)
              //console.log("m1 : ", m1)

              if(m1.matchCount == 4)
              { 
                console.log("We have a Match")
                //we need to find the track in the analyses table
                trackData = await TrackAnalysis.findById(req.params.analysisID)
                console.log("Track to Add BPM to : ", trackData)

                const BPMUpdate = { BPM: Number((data.body.track.tempo).toFixed(0)) }
                await trackData.updateOne(BPMUpdate)
                await trackData.save()

                const userUpdate = { users : ["***ALL***"] }
                await trackData.updateOne(userUpdate)
                var rSave = await trackData.save()
                console.log("Succesful write to Analytics : ",rSave)

                res.json({ Success : true })

              }
              else 
              {
                console.log(`Only ${m1.matchCount} Matched`)
                console.log("Matching trackanalysis id : ", req.params.analysisID)

                trackData = await TrackAnalysis.findById(req.params.analysisID)
                console.log("Track to Add BPM to : ", trackData)

                const BPMUpdate = { BPM: Number((data.body.track.tempo).toFixed(0)) }
                await trackData.updateOne(BPMUpdate)
                await trackData.save()

                var existingUsers = trackData.users
                existingUsers.push(req.params.userID)
                await trackData.updateOne({ users : existingUsers})
                var rSave = await trackData.save()
                console.log("Succesful write to Analytics : ",rSave)

                res.json({ Success : true })
              }
            
        })
       }).catch(function(err) {
          console.log('Something went wrong in GET Audio Analysis : ', err.message);
          res.json({ Success : false, Message : err.message })
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