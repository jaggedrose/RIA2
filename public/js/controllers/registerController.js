//Controller that handles user registration
app.controller("registerController", ["$http", "$scope", "User", "Login", "$location", function($http, $scope, User, Login, $location) {
  
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

  //on form submit
  $scope.newUserCreate = function() {
    //make username toLowerCase
    $scope.newUser.user_name = $scope.newUser.user_name.toLowerCase();
    User.create($scope.newUser, function(data) {
      if (!data.status) {
        // When a new user registers, call the login function
        // to log them in automatically
        Login.login($scope.newUser, function() {
          if (Login.user._id) {
            // And relocate them to their user profile page
            $location.path('/user');
          }
        });
      }
    });
  };

  //get country data
  $http.get('js/resources/countries.json').then(function(res){
    $scope.countries = res.data;
    //Make sure user has a country selected on load
    $scope.newUser.country = $scope.countries[0];
  });

  //Empties form fields
  $scope.resetForm = function() {
    $scope.newUser = angular.copy(userWhenReset);
  };

  //Every time $scope.newUser.userName changes
  $scope.$watch("newUser.user_name",function(newVal, oldVal){
    //if user_name exists on $scope.newUser make it lowercase
    if($scope.newUser.user_name) {
      $scope.newUser.user_name = $scope.newUser.user_name.toLowerCase();
    }
    if(!newVal){return;}
    // check if userName is registered
    User.get({user_name:newVal},function(listOfUsers){
      //If user with that userName is registered
      if(listOfUsers.length > 0){
        //make userName-input invalid
        $scope.registrationForm.userName.$setValidity("unique", false);
      }else {
        //make userName-input valid
        $scope.registrationForm.userName.$setValidity("unique", true);
      }
    });
  });

  //Every time $scope.newUser.email changes
  $scope.$watch("newUser.email",function(newVal,oldVal){
    if(!newVal){return;}
    // check if email is registered
    User.get({email:newVal},function(listOfUsers){
      //If users with that email exists
      if(listOfUsers.length){
        //make email-input invalid
        $scope.registrationForm.email.$setValidity("unique", false);
      }else{
        //make email-input valid
        $scope.registrationForm.email.$setValidity("unique", true);
      }
    });
  });

  //When word in password-inputs changes to valid word
  function pwdWatch(){
    //if password inputs match
    if($scope.newUser.password == $scope.password2){
      //Make form item valid
      $scope.registrationForm.password.$setValidity("identical", true);
    }else {
      //Make form item invalid
      $scope.registrationForm.password.$setValidity("identical", false);
    }
  }

  //Whenever any of these changes value - run pwdWatch
  $scope.$watch("newUser.password", pwdWatch);
  $scope.$watch("password2", pwdWatch);

}]);
