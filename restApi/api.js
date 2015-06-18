/**
 * NodeJS REST API module
 *
 */


// require mongoose
var mongoose = require("mongoose");
// connect to DB
mongoose.connect('mongodb://localhost/ngNodeRest');
// store mongo connection in db
var db = mongoose.connection;
// notify me when connected
db.once('open', function() {
  console.log("Connected to database!");
});

// require API helper function
var apiCall = require('./apiCall.function');

// apiModule object, where routes are born...
var apiModule = {

  /*
    // add new routes:
    // directly in file:
    pages: function(req, res, params) {
      if (req.method == "GET") {
        res.json("An answer");
      }
    },
    persons: {
      default: function(req, res, params) {
        if (req.method == "GET") {
          res.json("Another answer");
        }
      }
      // etc.
    }

    // by requiring files:
    pages: require('./routes/pages.route'),
    persons: require('./routes/persons.route')

  */
  

  // method to set up API routes on server start
  setApiRoute: function(app){


    /**
     * Setup CRUD for REST API
     */

    var me = this;

    // CREATE
    app.post('/api/*', function (req, res) {
      apiCall(me, req, res);
    });

    // READ
    app.get('/api/*', function (req, res) {
      apiCall(me, req, res);
    });

    // UPDATE
    app.put('/api/*', function (req, res) {
      apiCall(me, req, res);
    });

    // DELETE
    app.delete('/api/*', function (req, res) {
      apiCall(me, req, res);
    });
  }
};



// Export the apiModule object
module.exports = apiModule;