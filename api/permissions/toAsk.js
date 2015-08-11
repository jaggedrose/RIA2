module.exports = function(modelName, method, query, req) {
   console.log("Ask", modelName, method, query, req.body);

   if (
         req.method != "GET" && !req.session.user &&
         !(req.method == "POST" && modelName == "User")
      ) {
         return false;
   }
   return true;
};