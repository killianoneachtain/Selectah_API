var createError = require('http-errors');
var express = require('express');
var app = express();
require('dotenv').config();

var mongo = require('./utilities/mongo');

mongo.connectToServer( function( err, client ) {
  if (err) console.log(err);
  // start the rest of your app here


var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var authorizeRouter = require('./routes/authorize');
var userRouter = require('./routes/user');
var songRouter = require('./routes/song');
var auth0Router = require('./routes/auth0');
var searchRouter = require('./routes/songSearch');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/authorize',authorizeRouter);
app.use('/user',userRouter);
app.use('/song',songRouter);
app.use('/auth0',auth0Router);
app.use('/songSearch',searchRouter);


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
} );

module.exports = app;