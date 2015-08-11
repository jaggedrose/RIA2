// FileUploader factory, dependent on
//
// "Upload" service from ngFileUpload module
app.factory("FileUploader", ["Upload", function(Upload) {
  // FileUploader factory returns a function
  return function(file) {
    // the function returns the Upload request
    // so that we can still do .success() etc. in
    // our controllers
    return Upload.upload({
      // POST REST URL
      url: '/api/files',
      // send filename to save
      fileName: file.name,
      // and the file data
      file: file
    });
  };
}]);