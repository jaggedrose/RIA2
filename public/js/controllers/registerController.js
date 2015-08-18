//"myAppName" controller.
app.controller("registerController", ["$http", "$scope", "User", "$location", function($http, $scope, User, $location) {
  
  $scope.newUser = {};

  //template to copy into $scope.newUser on form reset
  var userWhenReset = {
    user_name: "",
    first_name: "",
    last_name: "",
    email: "",
    city: "",
    country: "",
    password: ""
  };

  $scope.newUserCreate = function() {
    User.create($scope.newUser, function(data) {
      console.log("user created", data);
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
    
    console.log("$scope.registrationForm after", $scope.registrationForm);
    //Empty newUser object
    console.log("Reset form");
    //We still need to fix the problem of invalid form data not removed when pushing reset-button
    */
    /*location.reload();*/
    console.log("Reset form! function");
    $scope.newUser = angular.copy(userWhenReset);
  };

  //Every time $scope.newUser.userName changes
  $scope.$watch("newUser.user_name",function(newVal, oldVal){
    console.log("$scope watch for userName", newVal, oldVal);
    //$scope.userNameAlreadyRegistered = false;
    if(!newVal){return;}
    // check if userName is registered
    User.get({user_name:newVal},function(listOfUsers){
      console.log("listOfUsers:", listOfUsers);
      if(listOfUsers.length > 0){
        console.log("Username exists");
        //$scope.userNameAlreadyRegistered = true;
        $scope.registrationForm.userName.$setValidity("unique", false);
      }else {
        $scope.registrationForm.userName.$setValidity("unique", true);
      }
    });
  });

  //Every time $scope.newUser.email changes
  $scope.$watch("newUser.email",function(newVal,oldVal){
    //$scope.emailAlreadyRegistered = false;
    if(!newVal){return;}
    // check if email is registered
    User.get({email:newVal},function(listOfUsers){
      //If users with that email exists
      if(listOfUsers.length){
        
        //$scope.emailAlreadyRegistered = true;
        
        //make email-input invalid
        $scope.registrationForm.email.$setValidity("unique", false);
      }else{
        $scope.registrationForm.email.$setValidity("unique", true);
      }
    });
  });


  //When valid word in password-inputs changes
  function pwdWatch(){
    // console.log("watch for pw");
    console.log("$scope.registrationForm.password", $scope.registrationForm.password);
    if($scope.newUser.password == $scope.password2){
      //Make form item valid
      console.log("They are the same");
      $scope.registrationForm.password.$setValidity("identical", true);
    }else {
      //Make form item invalid
      console.log("They are not the same");
      $scope.registrationForm.password.$setValidity("identical", false);
    }
  }
  $scope.$watch("newUser.password", pwdWatch);
  $scope.$watch("password2", pwdWatch);

}]);
