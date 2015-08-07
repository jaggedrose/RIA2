// A custom controller for /api/login,
// that needs to connect to the mongoose DB from inside mongresto
module.exports = function(mongoose) {
   return function(req, res) {
      // Get currently logged in user information (if there is any)
      if (req.method == "GET") {
         if (req.sesssion.user) {
            res.json(req.session.user);
         } else {
            res.json(false);
         }
      } else if (req.method == "POST") {
         // Log in user with following email and password
         mongoose.model("User").findOne(req.body, function(err, data) {
            if (err) { throw err; }
            console.log("session", data);
            // Never store the password
            data && (delete data.pass);
            // Store all other user info in a session property
            data && (req.session.user = data);
            // Answer with the logged in user (if there is one)
            res.json(data ? data : false);
         });
      } else if (req.method == "DELETE") {
         // Destroy the entire user session on logout
         req.session.destroy(function(err) {
            if (err) { throw err; }
            res.json(true);
         });
      } else {
         res.json({error: "Method not allowed"});
      }
   };
};