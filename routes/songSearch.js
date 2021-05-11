
var express = require('express');
var router = express.Router();
const cors = require('cors');
const fs = require('fs');
const SpotifyWebApi = require('spotify-web-api-node');
const Track = require('../models/track');
require('dotenv').config();

   /* GET releases track listing. */
router.get('/:userID/:releaseID/:song_artist/:album_title/:song_title', cors(), async function(req, res, next) {
  
    /* use the artist field and title field
    */
        const albumTitle = req.params.album_title;
        const releaseID = req.params.releaseID;
        const userID = req.params.userID;

        let Artist = req.params.song_artist;
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

        let TrackName = req.params.song_title;
        let Mix = "";
        if(TrackName.includes("("))
        {
          let temp = TrackName.split('(')[0].trim();
          Mix = TrackName.split('(')[1].split(')')[0].trim();
          TrackName = temp.trim();
        }

        //console.log("Artist : ",Artist,"Album Name : ",albumTitle, "Title : ",Track, "Mix :",Mix);  
        
        const newTrack = new Track({
          userID: userID,
          releaseID: releaseID,
          artist: Artist,
          album: albumTitle,
          trackName: TrackName,
          Mix: Mix,
          });
          let trck = await newTrack.save();
          console.log("New Track Added", trck);       

        //Track.save(discogsTr)
        //let track = await discogsTr.save();
        //console.log(track);

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
                          
                // Use the access token to retrieve information about the user connected to it
                return spotifyApi.searchTracks(`artist:${Artist} track:${TrackName}`,  { limit : 50 });
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
             
            },
            function(err) {
              console.log(
                'Something went wrong when retrieving an access token in the function getSpotifyToken()',
                err.message
              );
            }
          );   

    router.get('/:userID/deleteTracks', cors(), async function(req, res, next) {
        let response = await Track.deleteByUserID(req.params.userID)
    });
  

module.exports = router;