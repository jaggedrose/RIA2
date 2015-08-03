/**
 * NodeJS app/server setting s  
 *
 */


var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
console.log("app",app);

var mongresto = require("./mongresto.js");
mongresto.init(app,{
  // The MongoDB database to connect to
  dbName: "stories",

  // The path to the rest api
  apiPath: "/api",

  // The path where you should put your Mongoose models
  modelPath: "./mongoose-models/"
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



/*
  use custom api && routes
*/

//var myApi = require("./restApi/api.js");
//myApi.setApiRoute(app);

// 'catch all' route for angular in html5mode'
app.get('*', function (req, res) {
  res.sendFile('index.html', {root: './public'});
});



/* 
  error handlers
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 301;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log("Ouch, an error occurred!");
    throw err;
  });
}



/*
  set server port and startup message
*/

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});



module.exports = app;