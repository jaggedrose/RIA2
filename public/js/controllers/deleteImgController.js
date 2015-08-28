//Controls the "Yes-"/"No-"options in the deleteImgModal
app.controller('deleteImgController', ["$scope", "$modalInstance", "imgUrl", function($scope, $modalInstance, imgUrl) {

  $scope.imgUrl = imgUrl;

  $scope.ok = function() {
    $modalInstance.close();
  };

  $scope.cancel = function() {
    $modalInstance.dismiss();
  };

}]);