const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema({  
    name: {type: String, required: true},    
    id: { type: Number, required: true },
   
    });

  ArtistSchema.statics.findByID = function(id) {
    return this.findOne({ id : id});
  };
  
  ArtistSchema.statics.findByName = function(name) {
    return this.findOne({ name : name});
  };
  
  ArtistSchema.statics.save = function(id)
  {
    return this.save(id);
  }
  
  module.exports = mongoose.model('Artist', ArtistSchema);