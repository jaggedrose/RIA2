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

// Initialize our own REST api - mongresto
m.mongresto.init(app,{
  // The MongoDB database to connect to
  dbName: "stories",
  // The path to the rest api
  apiPath: "/api",
  // The path where you should put your Mongoose models
  modelPath: "./mongoose-models/",
});

// Route everything "else" to angular (in html5mode)
app.get('*', function (req, res) {
  res.sendFile('index.html', {root: './public'});
});

// Start up
app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});