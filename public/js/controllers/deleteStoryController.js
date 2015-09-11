//Controls the "Yes-"/"No-"options in the deleteStoryModal
app.controller('deleteStoryController', ["$scope", "$modalInstance",  function($scope, $modalInstance) {

  $scope.ok = function() {
    $modalInstance.close();
  };

  $scope.cancel = function() {
    $modalInstance.dismiss();
  };

}]);