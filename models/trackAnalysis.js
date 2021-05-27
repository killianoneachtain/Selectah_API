const mongoose = require('mongoose');
/**
 
 */

const TrackAnalysisSchema = new mongoose.Schema({ 
    releaseID: {type: String}, 
    position: {type: String},
    title: {type: String, required: true},
    users: {type: Array},
    BPM: {type: Number},
    BPMConfidence: {type: Number},
    Key: {type: String},
    KeyConfidence: {type: Number},
    Date: {type: String}
  });

TrackAnalysisSchema.statics.findByUser = function(user) {
  return this.findOne({ user: user });
};

TrackAnalysisSchema.statics.findByRelease = function(releaseID) {
  console.log("finding Track analyses for : ", releaseID);
    return this.find({ releaseID: releaseID });
  };

TrackAnalysisSchema.statics.findByBPM = function(BPM) {
  return this.findOne({ BPM : BPM});
};

TrackAnalysisSchema.statics.findByKey = function(Key) {
    return this.findOne({ Key : Key});
  };
  
TrackAnalysisSchema.statics.findByID = async function(id) {
  console.log("finding Track by ID analyses for : ", id, "Number : ", Number(id));
    return await this.findOne({ _id : Number(id)});
  };

TrackAnalysisSchema.statics.findByType = function(type) {
  return this.findOne({ type_ : type});
};

TrackAnalysisSchema.statics.save = function()
{
  return this.save();
}


module.exports = mongoose.model('TrackAnalysis', TrackAnalysisSchema);