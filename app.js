var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb+srv://21tcqbg73uip45jv7bhr3p6za:MoW@x057xx@selectah.jcl8g.mongodb.net/selectah?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  
var nameSchema = new mongoose.Schema({    
    id: String
   });

var User = mongoose.model("User",nameSchema);

var indexRouter = require('./routes/index');
var authorizeRouter = require('./routes/authorize');
var userRouter = require('./routes/user');
var songRouter = require('./routes/song');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



  app.post("/adduser/:spotfiy_id", (err, req, res, next) => {
    var myData = new User(req.params.spotify_id);
    myData.save()
    .then(item => {
    res.send("item saved to database");
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
   });


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/authorize',authorizeRouter);
app.use('/user',userRouter);
app.use('/song',songRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

/**
 * 
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://21tcqbg73uip45jv7bhr3p6za:MoW@x057xx@selectah.jcl8g.mongodb.net/selectah?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

 */
