var express = require('express');
var router = express.Router();
const cors = require('cors');
const fs = require('fs');
const SpotifyWebApi = require('spotify-web-api-node');

   /* GET releases track listing. */
router.get('/:song_artist/:song_title', cors(), function(req, res, next) {
  
    /* use the artist field and title field
    */
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

        let Track = req.params.song_title;
        let Mix = "";
        if(Track.includes("("))
        {
          let temp = Track.split('(')[0].trim();
          Mix = Track.split('(')[1].split(')')[0].trim();
          Track = temp.trim();
        }


        console.log("Artist : ",Artist, "Title : ",Track, "Mix :",Mix);  
        
        const spotifyApi = new SpotifyWebApi({
            clientId: 'fd323724c7db406187a9a00ff6519101',
            clientSecret: 'fbafa9ca1ce642e9b19738978503314a'
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
                return spotifyApi.searchTracks(`${Artist} ${Track}`);
                })
                .then(function(data) {
                // Print some information about the results
                return res.json(data.body.tracks);
                console.log('I got ' + data.body.tracks.total + ' results!');
            
                // Go through the first page of results
                var firstPage = data.body.tracks.items;
                //console.log(firstPage);
                //console.log('The tracks in the first page are (popularity in parentheses):');
                
                
                firstPage.forEach(function(track, index) {
                    //console.log(index + ': '  + ' - ' + track.name + ' (' + track.popularity + ')');
                    track.artists.forEach(function(artiste, Aindex)
                    {
                        console.log(index + ': ' + artiste.name + ' - ' + track.name + ' (' + track.id + ')');
                        if((artiste.name.toLowerCase().trim() == Artist.toLowerCase().trim()) && (track.name.trim() == Track.trim()))
                        {
                            console.log("WE HAVE A MATCH");
                            spotifyApi.getAudioAnalysisForTrack(`${track.id}`).then(
                                function(data) 
                                {
                                    //console.log(data.body.track);
                                    console.log("BPM IS : ",Number((data.body.track.tempo).toFixed(0)));  
                                    console.log("Tempo Confidence IS : ",data.body.track.tempo_confidence);  
                                    console.log("Key  IS : ",data.body.track.key);
                                    console.log("Key confidence IS : ",data.body.track.key_confidence);      
                                })
                                
                        }
                        else
                        { 
                            console.log("NO MATCH");
                        }
                    })
                });
                }).catch(function(err) {
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
        
        
               
;

function getSpotifyToken() 
{   
    const spotifyApi = new SpotifyWebApi({
        clientId: 'fd323724c7db406187a9a00ff6519101',
        clientSecret: 'fbafa9ca1ce642e9b19738978503314a'
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