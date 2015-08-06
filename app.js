
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
var session = require('express-session');

// Require modules
var m = {};
[
  "express",
  "path",
  "serve-favicon",
  "cookie-parser",
  "body-parser",
  "./mongresto"
].forEach(function(x){
  // store required modules in m
  m[x.replace(/\W/g,'')] = require(x);
});


// Standard Express boiler plate code
var app = m.express();
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(m.bodyparser.json());
app.use(m.bodyparser.urlencoded({ extended: false }));
app.use(m.cookieparser());
app.use(m.express.static(m.path.join(__dirname, 'public')));


// tell nodejs to use express-session 
// for session management (all routes!)
app.use(session({
  // 'secret' authentication key, 
  // should be changed to something hard to guess
  secret: 'ketchup',
  resave: false,
  saveUninitialized: true
}));

// Initialize our own REST api - mongresto
m.mongresto.init(app,{
  // The MongoDB database to connect to
  dbName: "stories",
  // The path to the rest api
  apiPath: "/api",
  // The path where you should put your Mongoose models
  modelPath: "./mongoose-models/",
  // A function that gets access to the current question
  // and can deny Mongresto permission to run it
  permissionToAsk:
    function(modelName, method, query, rbody){ return true; },

  // A function that gets access to the current result
  // (and question) and can deny Mongresto permission to return it
  permissionToAnswer:
    function(modelName, method, query, rbody, result){ return true; }
});

// Route everything "else" to angular (in html5mode)
app.get('*', function (req, res) {
  res.sendFile('index.html', {root: './public'});
});

// Start up
app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
