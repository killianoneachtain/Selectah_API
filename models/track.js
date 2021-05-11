const mongoose = require('mongoose')

var TrackSchema = new mongoose.Schema({ 
    releaseID: {type: String},
    artist: {type: String},
    album: {type: String},
    trackName: {type: String},
    Mix: {type: String}

  });

  TrackSchema.statics.findByDiscogsID = function(releaseID) {
    return this.findOne({ releaseID : releaseID});
  };
  
  TrackSchema.statics.findByID = function(id) {
    return this.findOne({ _id : id});
  };
  
  TrackSchema.statics.findByArtist = function(artist) {
    return this.findOne({ artist : artist});
  };
  
  TrackSchema.statics.save = function()
  {
    return this.save();
  }
  
  module.exports = mongoose.model('Track', TrackSchema);
