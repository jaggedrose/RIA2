var config = require("../../config.json");
var sha256 = require("sha256");

module.exports = function(modelName, method, query, req) {
   //console.log("Ask", modelName, method, query, req.body);

   // if (
   //       req.method != "GET" && !req.session.user &&
   //       !(req.method == "POST" && modelName == "User")
   //    ) {
   //       return false;
   // }

   if (modelName == "User" && method == "PUT") {
      if (req.body.password) {
         req.body.password = sha256(config.hashSalt + req.body.password);
      }
   }
   return true;
};