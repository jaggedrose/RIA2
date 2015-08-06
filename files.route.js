module.exports = function (req, res) {
	console.log("req.files: ", req.files);

  // the recieved file
  var file = req.files.file;

  // read the recieved file
  fs.readFile(file.path, function (err, data) {
    // decide where to store the file
    var uploadPath = __dirname + "/public/upload/" + file.name;

    // write file to file system
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