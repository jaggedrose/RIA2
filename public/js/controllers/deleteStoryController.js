//Controls the "Yes-"/"No-"options in the deleteImgModal
app.controller('deleteStoryController', ["$scope", "$modalInstance",  function($scope, $modalInstance) {

  $scope.ok = function() {
    $modalInstance.close();
  };

  $scope.cancel = function() {
    $modalInstance.dismiss();
  };

}]);