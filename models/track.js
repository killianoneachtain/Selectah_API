const mongoose = require('mongoose')

var TrackSchema = new mongoose.Schema({
    discogsReleaseID: {type: Number, required: true, unique: true},    
    updated: { type: Date, required: true, default: Date.now()},
    position: {type: String, min:2,max:8}, 
    artists: {type: Array, default:[]},
    extraartists: {type: Array, default:[]},
    title: {type: String, require:true},
    BPM: {type: Number, max:6, default: 0},
    MyBPM: {type: Array, default:[]}
  });

  module.exports = mongoose.model('Track', TrackSchema);
