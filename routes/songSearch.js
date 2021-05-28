
var express = require('express');
var router = express.Router();
const cors = require('cors');
const fs = require('fs');
const SpotifyWebApi = require('spotify-web-api-node');
const Track = require('../models/track');
require('dotenv').config();

   /* GET releases track listing. */
router.get('/:userID/:releaseID/:songArtist/:albumTitle/:songTitle', cors(), async function(req, res,  next) {
  
    /* use the artist field and title field
    */

        var deleteAllFirst =  await Track.deleteByUserID(req.params.userID)
        console.log("Delete all user tracks before start",deleteAllFirst)

        if(deleteAllFirst.ok !== 1)
        { 
          return res.json({"Error" : "Failed to Delete previous track searches"})
        } 

        const albumTitle = req.params.albumTitle.trim();
        const releaseID = req.params.releaseID.trim();
        const userID = req.params.userID.trim();

        var Artist = req.params.songArtist.trim();
        if (Artist.includes('('))
        { 
          var temp = Artist.split('(')[0].trim();
          Artist = temp.trim();
        }

        if(Artist.includes('&'))
        { 
          vartemp = Artist.split('&')[0].trim();
          Artist = temp.trim();
        }

        var TrackName = req.params.songTitle.replace("'","‘").trim();
        console.log("track name",TrackName)       
        var Mix = "";
        if(TrackName.includes("("))
        {
          var temp = TrackName.split('(')[0].trim();
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
          source: "Discogs",
          mix: Mix,
          });
          var trck = await newTrack.save();
          console.log("New Track Added ID :", trck._id);       

        //Track.save(discogsTr)
        //var track = await discogsTr.save();
        //console.log(track);

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

              console.log("sending : ", Artist, TrackName)

              await spotifyApi.setAccessToken(data.body['access_token']);
                          
                // Use the access token to retrieve information about the user connected to it
                return await spotifyApi.searchTracks(`artist:${Artist.toLowerCase()} track:${TrackName.toLowerCase()}`,  { limit : 50 });
                })
                .then(async function(data) 
                {
                  if(data.body.tracks.items.length < 1)
                  {                   
                    
                      data = await spotifyApi.searchTracks(`artist:${Artist.toLowerCase()} track:${TrackName.toLowerCase().replace("ing", "in")}`,  { limit : 50 });
                      return res.json(data.body.tracks); 
                    }                  
                  


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
        var response = await Track.deleteByUserID(req.params.userID)
        res.json(response)
    });
  

module.exports = router;