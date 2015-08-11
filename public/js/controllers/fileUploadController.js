//File upload form controller.
app.controller("fileUploadController", ["FileUploader", "$scope", function(FileUploader, $scope) {

  $scope.formSubmit = function() {
    FileUploader($scope.files[0]).success(function(data) {
 });
  };
}]);