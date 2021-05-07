const mongoose = require('mongoose')

var TrackSchema = new mongoose.Schema({
    artist: {type: String},
    album: {type: String},
    trackName: {type: String},
    Mix: {type: String},

  });

  module.exports = mongoose.model('Track', TrackSchema);
