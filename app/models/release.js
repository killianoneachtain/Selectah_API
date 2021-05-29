const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReleaseSchema = new mongoose.Schema({  
    Discogs_id: {type: String, required: true},
    artists: Array,
    artists_sort: String,
    date_changed: String,
    master_id: Number,
    title: String,
    genres: Array,
    styles: Array,
    tracklist: Array
  });
  //[{ type: mongoose.Schema.Types.ObjectId, ref: 'TracklistEntry' }]

ReleaseSchema.statics.findByDiscogsID = function(Discogs_id) {
  console.log("looking for", Discogs_id)
  return this.findOne({ Discogs_id : Discogs_id});
};

ReleaseSchema.statics.findByID = function(id) {
  return this.findOne({ _id : id});
};

ReleaseSchema.statics.findByType = function(type) {
  return this.findOne({ type : type});
};

ReleaseSchema.statics.save = function()
{
  return this.save();
}


module.exports = mongoose.model('Release', ReleaseSchema);