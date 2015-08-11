//File upload form controller.
app.controller("fileUploadController", ["FileUploader", "$scope", function(FileUploader, $scope) {

  $scope.formSubmit = function() {
    console.log("files: ", $scope.files);
    // only supporting single file upload ([0]) 
    // at the moment...
    FileUploader($scope.files[0]).success(function(data) {
    console.log("saved file, public path: ", data);
    });
  };
}]);