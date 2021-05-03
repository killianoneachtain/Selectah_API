const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReleaseSchema = new mongoose.Schema({  
    Discogs_id: {type: Number, required: true},
    artists: {type : Schema.Types.ObjectId, ref: 'Artist'},
    artists_sort: String,
    date_changed: String,
    master_id: Number,
    title: String,
    genres: Array,
    styles: Array,
    tracklist: Array
  });

ReleaseSchema.statics.findByDiscogsID = function(Discogs_id) {
  return this.findOne({ Discogs_id : Discogs_id});
};

ReleaseSchema.statics.findByID = function(id) {
  return this.findOne({ _id : id});
};

ReleaseSchema.statics.findByType = function(type) {
  return this.findOne({ type : type});
};

ReleaseSchema.statics.save = function(id)
{
  return this.save(id);
}

module.exports = mongoose.model('Release', ReleaseSchema);