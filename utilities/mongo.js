
//Import the mongoose module
const mongoose = require('mongoose')
require('dotenv').config()
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

var db;

var mongoDB = process.env.selectahDataBase;

module.exports = {
//Set up default mongoose connection

connectToServer: function ( callback ) {
    mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true},
        function ( err, client ) {
        db = mongoose.connection;
        //console.log("Connected to Mongo using ", process.env.selectahDataBase)
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        return callback( err);
    } ); 
},

getDb : function () {
    return db;
}
}
