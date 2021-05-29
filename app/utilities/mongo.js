
//Import the mongoose module
const mongoose = require('mongoose')
require('dotenv').config()
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

var db;

//var mongoDB = process.env.selectahDataBase;
//console.log("mongoDB is", mongoDB)
module.exports = {
//Set up default mongoose connection

connectToServer: function ( callback ) {
    mongoose.connect(process.env.selectahDataBase, {useNewUrlParser: true, useUnifiedTopology: true},
        function ( err, client ) {
        db = mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        return callback( err);
    } ); 
},

getDb : function () {
    return db;
}
}
