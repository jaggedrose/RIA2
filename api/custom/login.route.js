// A custom controller for /api/login,
// that needs to connect to the mongoose DB from inside mongresto
module.exports = function(mongoose) {

   var config = require("../../config.json");
   var sha256 = require("sha256");

   return function(req, res) {
      // Get currently logged in user information (if there is any)
      if (req.method == "GET") {
         if (req.session.user) {
            res.json(req.session.user);
            console.log("Logged in user is: ", req.session.user.user_name);
         } else {
            res.json(false);
         }

      //log in user 
      } else if (req.method == "POST") {
         if(!req.body.email || !req.body.password){
            res.json(false);
            return;
         }

         //encrypt the users password
         console.log("Before sha256", req.body.password);
         req.body.password = sha256(config.hashSalt + req.body.password);
         console.log("After sha256", req.body.password);

         // Log in user with following email and password
         mongoose.model("User").findOne(req.body, function(err, userObj) {
         if (err) { throw err; }
            console.log("ss", userObj);
            // Never store the password
            userObj && (userObj.password = "");

            // Store all other user info in a session property
            userObj && (req.session.user = userObj);
            // Answer with the logged in user (if there is one)
            res.json(userObj ? userObj : false);
         });
      } else if (req.method == "DELETE") {
         // Destroy the entire user session on logout
         req.session.destroy(function(err) {
            console.log("User logged out!");
            if (err) { throw err; }
            res.json(true);
         });
      } else {
         res.json({error: "Method not allowed"});
      }
   };
};