// FileUploader factory, dependent on
//
// "Upload" service from ngFileUpload module
app.factory("FileUploader", ["Upload", "$q", function(Upload, $q) {
  // FileUploader factory returns a function
  return function(file) {

    console.log("f", file);

    if (!file.name) {
      // @bug THIS IS A TEMPORARY BUGFIX FOR ngf-select field duplication
      console.log("FileUploader missing filename, deep clone: ", angular.copy(file));
      return {
        success: function() {} // return a fake success function to preserve controller code
      };
    }

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