/**
 * Rest "router". Finds API controller 
 * for incoming request
 *
 */


// require API helper function
var errMsg = require('./errMsg.function');

// function that decides which REST controller to use
// for any given route that our backend recieves
function apiCall(apiModule, req, res) {
  // start by breaking req.path into pieces
  // remove "/api/" and split the remainder using "/"
  var pieces = req.path.split("/api/").join("").split("/");

  // go through all url pieces and find the API controller
  // (find the function for a specific route)
  var methodToCall = '';
  var lastIndex = -1;
  pieces.every(function(piece, index) {
    // check if there is a method to call
    // or at least another level in the API
    if (
      // if we can't find anything on the top level
      // and we haven't found any method to call yet
      (!apiModule[piece] && !methodToCall) ||
      // OR if what we have found does not have the
      // next thing we are looking for
      (methodToCall && !methodToCall[piece])
    ) {
      // try to fallback on default method
      methodToCall = methodToCall["default"] ?
        methodToCall["default"] :
        methodToCall;

      // and stop looking
      return false;
    }

    // if we found something, put it in methodToCall
    methodToCall = methodToCall ? methodToCall[piece] : apiModule[piece];

    // remember the index of the method we found last
    lastIndex = index;

    // and keep looking
    return true;
  });

  // once we are done checking the pieces of a URL (route)
  // make sure we found a function
  // if we didn't
  if (typeof methodToCall != "function") {
    if (methodToCall["default"]) {
      // check if there is a fallback function
      methodToCall = methodToCall["default"];
    } else {
      // else respond with an error
      res.json( errMsg() );
      return;
    }
  }

  // convert any remaining pieces into parameters
  var params = pieces.slice(lastIndex+1);

  // and call the API method, 
  // giving it req, res and params as arguments
  methodToCall(req, res, params);
}



// export our function for require()
module.exports = apiCall;