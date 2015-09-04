// fs is NodeJs file system module used for storing files from server locally
var fs = require('fs');

module.exports = function (req, res) {
	console.log("req.files: ", req.files);

  // the recieved file
  var file = req.files.file;

  // read the recieved file
  fs.readFile(file.path, function (err, data) {

    //Make the filename unique by adding date/time to the name
    var newName = file.name.split(".");
    newName[0] = "[" + new Date().getTime() + "]" + newName[0];
    newName = newName.join(".");
    console.log("The newName: ", newName);


    // decide where to store the file
    var uploadPath = __dirname + "/public/upload/" + newName;

    // write file to file system/
    fs.writeFile(uploadPath, data, function (err, data) {
      if (err) throw err;

      // find public path (for <img src=""> tags etc)
      var publicPath = uploadPath.split('/public');
      publicPath = publicPath[publicPath.length-1];

      // and send response
      res.json(publicPath);
    });
  });
  
};