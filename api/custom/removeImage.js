module.exports = function(mongoose) {
   var publicFolder = __dirname.split("\\").join("/").split("/");
   publicFolder.pop();publicFolder.pop();
   publicFolder = publicFolder.join("/") + "/public";

    console.log("hej",publicFolder);
   var fs = require('fs');
   return function(req, res) {
      fs.unlink(publicFolder + req.body.imgsrc);
   };
};