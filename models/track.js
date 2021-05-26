const mongoose = require('mongoose')

var TrackSchema = new mongoose.Schema({ 
    userID: {type: String},  
    releaseID: {type: String},
    artist: {type: String},
    album: {type: String},
    trackName: {type: String},
    mix: {type: String},
    source: {type: String},
    spotifyID: {type: String}
  });

  TrackSchema.statics.findByDiscogsID = function(releaseID) {
    return this.findOne({ releaseID : releaseID});
  };

  TrackSchema.statics.findBySpotifyID = function(spotifyID) {
    return this.findOne({ spotifyID : spotifyID});
  }
  
  TrackSchema.statics.findByID = function(id) {
    return this.findOne({ _id : id});
  };
  
  TrackSchema.statics.findByArtist = function(artist) {
    return this.findOne({ artist : artist});
  };

  TrackSchema.statics.findByUserID = function(userID) {
    return this.find({ userID : userID});
  };

  TrackSchema.statics.deleteByUserID = function(userID) {
    return this.deleteMany({ userID : userID})
  }
  
  TrackSchema.statics.save = function()
  {
    return this.save();
  }
  
  module.exports = mongoose.model('Track', TrackSchema);
