
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
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var session = require('express-session');

// Require modules
var m = {};
[
  "express",
  "path",
  "serve-favicon",
  "cookie-parser",
  "body-parser",
  "connect-multiparty",
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

//Showing the route for the uploaded image on serverside(/api/files) starting multipartM and calling function 'require'
app.post('/api/files', multipartMiddleware, require('./files.route'));


// Tell node to use express-session
app.use(session({
  // 'secret' is our authentication key, has been changed to something hard to guess.
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
  // Our custom routes
  customRoutes: [
    {
      method: "all",
      path: "login",
      controller: require('./api/custom/login.route')
    },
    {
      method: "all",
      path: "removeImage",
      controller: require('./api/custom/removeImage')
    }
  ],
  // A function that gets access to the current question
  // and can deny Mongresto permission to run it
  permissionToAsk: require('./api/permissions/toAsk'),
  // A function that gets access to the current result
  // (and question) and can deny Mongresto permission to return it
  permissionToAnswer: require('./api/permissions/toAnswer')
});

// Route everything "else" to angular (in html5mode)
app.get('*', function (req, res) {
  res.sendFile('index.html', {root: './public'});
});

// Start up
app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
