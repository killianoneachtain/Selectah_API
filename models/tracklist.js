const mongoose = require('mongoose');
/**
 

position:"A"
type_:"track"
title:"Circles (Original Mix)"
duration:"8:31"



 */

const TracklistSchema = new mongoose.Schema({  
    position: {type: String},
    type_: {type: String},
    title: {type: String},
    artists: {type: Array},
    duration: {type: String},    
    BPM: {type: Array}
  });

TracklistSchema.statics.findByPosition = function(position) {
  return this.findOne({ position: position });
};

TracklistSchema.statics.findByID = function(id) {
  return this.findOne({ _id : id});
};

TracklistSchema.statics.findByType = function(type) {
  return this.findOne({ type_ : type});
};

TracklistSchema.statics.save = function()
{
  return this.save();
}


module.exports = mongoose.model('Tracklist', TracklistSchema);