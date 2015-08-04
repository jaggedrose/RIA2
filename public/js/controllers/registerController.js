//"myAppName" controller.
app.controller("registerController", ["$http", "$scope", "User", function($http, $scope, User) {
  $scope.newUser = {};
  $scope.newUserCreate = function() {
    $scope.createdUser = User.create($scope.newUser, function() {
      console.log("User.create($scope.newUser)",$scope.createdUser);
    });
  };
}]);

