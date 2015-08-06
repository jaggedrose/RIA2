//"myAppName" controller.
app.controller("registerController", ["$http", "$scope", "User", "$location", function($http, $scope, User, $location) {
  $scope.newUser = {};
  $scope.newUserCreate = function() {
    $scope.createdUser = User.create($scope.newUser, function() {
      console.log("$scope.createdUser",$scope.createdUser);
    });
    console.log("$scope.newUser: ", $scope.newUser);
  };

  //Empties form fields
  $scope.resetForm = function() {
    $scope.registrationForm.$setPristine(true);
    $scope.newUser = {};
    console.log("$scope.registrationForm after", $scope.registrationForm);
    //Empty newUser object
    console.log("Reset form");
    //Waiting for Hugos suggestion on how to remove the invalid data as well when reseting the form.
  };

  $http.get('js/resources/countries.json').then(function(res){
    $scope.countries = res.data;
  });

}]);

