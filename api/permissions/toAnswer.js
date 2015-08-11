module.exports = function(modelName, method, query, req) {
   console.log("Answer", modelName, method, query, req);
   return true;
};