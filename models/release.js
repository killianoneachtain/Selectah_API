const mongoose = require('mongoose')


const ReleaseSchema = new mongoose.Schema({
    discogsReleaseID: {type: String, required: true, unique: true},
    artist:{type: String, required: true},
    title: {type: String, require:true},   
    updated: { type: Date, required: true, default: Date.now()},
    tracklist: {type: Array, default:[]}
  });

  module.exports = mongoose.model('Release', ReleaseSchema);

/*
   * var bpmSchema = new mongoose.Schema({
        matched: {type: String, required: true},
        bpm: Number,
        userBPM: Array  
        })

        var userBPMSchema = new mongooseSchema({
        user: {type: User, require: true},
        trackID: {type: String, required: true},
        })
*/
