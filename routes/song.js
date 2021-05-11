/* 

var express = require('express');
var router = express.Router();
const cors = require('cors');
const fs = require('fs');
const SpotifyWebApi = require('spotify-web-api-node');
const Track = require('../models/track');
const mongoUtil = require('../utilities/mongo');



/* GET Track Audio Analysis from Spotify 
router.get('/audioAnalysis/:userID/:discogs_track_DB_ID/:artist/:album_title/:track_title/:track_id', cors(), function (req, res,next) {
  
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.Spotify_Client_ID,
    clientSecret: process.env.Spotify_Client_Secret
  });
  
  console.log("Artist  :", req.params.artist)
  console.log("Album Title :", req.params.album_title)
  console.log("Track title :", req.params.track_title)

  console.log("Track id :", req.params.track_id)

  //var token="";

  // Retrieve an access token
  spotifyApi.clientCredentialsGrant().then(
    function(data) {
      //console.log('The access token expires in ' + data.body['expires_in']);
      //console.log('The access token is ' + data.body['access_token']);          
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
      spotifyApi.getAudioAnalysisForTrack(`${req.params.track_id}`).then(
        function(data) 
        {
            //console.log(data.body.track);
            console.log("BPM IS : ",Number((data.body.track.tempo).toFixed(0)));  
            console.log("Tempo Confidence IS : ",data.body.track.tempo_confidence);  
            console.log("Key  IS : ",data.body.track.key);
            console.log("Key confidence IS : ",data.body.track.key_confidence);      
        })
       }).catch(function(err) {
          console.log('Something went wrong in GET Audio Analysis', err.message);
          });  
       
      },
      function(err) {
        console.log(
          'Something went wrong when retrieving an access token in the function getSpotifyToken()',
          err.message
        );
      }
    );                   


   /* GET tracks that match the discogs track from Spotify. 

  router.get('/getTracks/:songArtist/:albumTitle/:songTitle', cors(), function(req,err, res, next) {
  
    /* use the artist field and title field    
   if(err) {
     next(err)
   } else 
   {
   conosle.log("Trying to get tracks from Spotify")
        var albumTitle = req.params.albumTitle
      //  var releaseIdentifier = req.params.releaseID

        var Artist = req.params.songArtist;
        if (Artist.includes('('))
        { 
          let temp = Artist.split('(')[0].trim();
          Artist = temp;
        }

        if(Artist.includes('&'))
        { 
          let temp = Artist.split('&')[0].trim();
          Artist = temp.trim();
        }

        var trackName = req.params.songTitle;        
        var Mix = "";

        if(trackName.includes("("))
        {
          let temp = trackName.split('(')[0].trim();
          Mix = trackName.split('(')[1].split(')')[0].trim();
          trackName = temp.trim();
        }

        console.log("Artist : ",Artist,"Album Name : ",albumTitle, "Title : ",trackName, "Mix :",Mix);  
        
        const newTrack = new TrackDetails({    
          //releaseID: releaseIdentifier,      
          artist: Artist,
          album: albumTitle,
          trackName: trackName,
          Mix: Mix,
        });
        
        //const release = newTrack.save();

        //console.log("Discogs Track : ", newTrack);

        //write to mongoTrack db here, so that
        // you can return the object id to the app
        // this id is sent along with the chosen
        // track for string comparison.

        const spotifyApi = new SpotifyWebApi({
            clientId: process.env.Spotify_Client_ID,
            clientSecret: process.env.Spotify_Client_Secret            
          });
          
          var token="";          
    
          // Retrieve an access token
          spotifyApi.clientCredentialsGrant().then(
            function(data) {
              //console.log('The access token expires in ' + data.body['expires_in']);
              //console.log('The access token is ' + data.body['access_token']);          
              // Save the access token so that it's used in future calls
              spotifyApi.setAccessToken(data.body['access_token']);
                          
                // Use the access token to retrieve information about the user connected to it
                return spotifyApi.searchTracks(`artist:${Artist} track:${trackName}`,  { limit : 50 });
                })
                .then(function(data) 
                {
                // Print some information about the results
                  console.log('There are ' + data.body.tracks.total + ' results!');
                  //console.log(data.body.tracks)
                  return res.json(data.body.tracks); 
               
                }).catch(function(err) 
                {
                  console.log('Something went wrong in the mainFlow:', err.message);
                });  
             
            }},
            function(err) {
              console.log(
                'Something went wrong when retrieving an access token in the function getSpotifyToken()',
                err.message
              );
            });                 
;

function getSpotifyToken() 
{   
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.Spotify_Client_ID,
    clientSecret: process.env.Spotify_Client_Secret            
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

module.exports = router;

*/

var express = require('express');
var router = express.Router();
const cors = require('cors');
const fs = require('fs');
const SpotifyWebApi = require('spotify-web-api-node');
const Track = require('../models/track');
require('dotenv').config();

/* GET Track Audio Analysis */
router.get('/:artist/:album_title/:track_title/:track_id', cors(), function (req, res,next) {
  
  console.log("Artist  :", req.params.artist)
  console.log("Album Title :", req.params.album_title)
  console.log("Track title :", req.params.track_title)
  console.log("Track id :", req.params.track_id)

  // i need to see if the track coming in matches the track that is selected
  // from the discogs track list.
  // need the objectid of the track.


  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SpotifyClientID,
    clientSecret: process.env.SpotifyClientSecret
  });  

  var token="";
  // Retrieve an access token
  spotifyApi.clientCredentialsGrant().then(
    function(data) {
      //console.log('The access token expires in ' + data.body['expires_in']);
      //console.log('The access token is ' + data.body['access_token']);          
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
      spotifyApi.getAudioAnalysisForTrack(`${req.params.track_id}`).then(
        function(data) 
        {
            //console.log(data.body.track);
            console.log("BPM IS : ",Number((data.body.track.tempo).toFixed(0)));  
            console.log("Tempo Confidence IS : ",data.body.track.tempo_confidence);  
            console.log("Key  IS : ",data.body.track.key);
            console.log("Key confidence IS : ",data.body.track.key_confidence);      
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