//"myAppName" controller.
app.controller("registerController", ["$http", "$scope", "User", "$location", function($http, $scope, User, $location) {
  $scope.newUser = {};
  $scope.newUserCreate = function() {
    $scope.createdUser = User.create($scope.newUser, function() {
      console.log("$scope.createdUser",$scope.createdUser);
    });
    console.log("$scope.newUser: ", $scope.newUser);
    //Add code to redirect registered user to his/her page

  };

  $http.get('js/resources/countries.json').then(function(res){
    $scope.countries = res.data;
  });

  //Empties form fields
  $scope.resetForm = function() {
    /*
    $scope.registrationForm.$setPristine(true);
    $scope.newUser = {};
    console.log("$scope.registrationForm after", $scope.registrationForm);
    //Empty newUser object
    console.log("Reset form");
    //We still need to fix the problem of invalid form data not removed when pushing reset-button
    */
    location.reload();
  };

  //This is a keyUp-function for the email input-field
  /*$scope.checkForEmail = function() {
    console.log("checkForEmail function");
    //Check if the email is already registered
    
  };*/

  //Every time $scope.newUser.email changes
  $scope.$watch("newUser.email",function(newVal,oldVal){
    $scope.emailAlreadyRegistered = false;
    if(!newVal){return;}
    // check against database
    User.get({email:newVal},function(listOfUsers){
      //If users with that email exists
      if(listOfUsers.length){
        // Make Error message show
        $scope.emailAlreadyRegistered = true;
      }
    });
  });

  $scope.$watch("newUser.userName",function(newVal, oldVal){
    $scope.userNameAlreadyRegistered = false;
    if(!newVal){return;}
    User.get({user_name:newVal},function(listOfUsers){
      if(listOfUsers.length){
        $scope.userNameAlreadyRegistered = true;
      }
    });
  });

}]);