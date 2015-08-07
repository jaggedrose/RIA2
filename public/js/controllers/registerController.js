//"myAppName" controller.
app.controller("registerController", ["$http", "$scope", "User", "$location", function($http, $scope, User, $location) {
  $scope.newUser = {};
  $scope.newUserCreate = function() {
    $scope.createdUser = User.create($scope.newUser, function() {
      console.log("$scope.createdUser",$scope.createdUser);
    });
    console.log("$scope.newUser: ", $scope.newUser);
  };

  $http.get('js/resources/countries.json').then(function(res){
    $scope.countries = res.data;
  });

  //Empties form fields
  $scope.resetForm = function() {
    $scope.registrationForm.$setPristine(true);
    $scope.newUser = {};
    console.log("$scope.registrationForm after", $scope.registrationForm);
    //Empty newUser object
    console.log("Reset form");
    //We still need to fix the problem of invalid form data not removed when pushing reset-button
  };

  //This is a keyUp-function for the email input-field
  $scope.checkForEmail = function() {
    console.log("checkForEmail function");
    //Check if the email is already registered
    
  };

}]);
