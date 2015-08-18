//"myAppName" controller.
app.controller("UserController", ["$http", "$scope", "$location", "Story", "User","Login", function($http, $scope, $location, Story, User, Login) {
  

$scope.User = Login.user;
hehehe = $scope.User;
console.log("UserController", Login.user);

function waitForUser(callback) {
  if (!$scope.User._id) {
    setTimeout(function() {
      waitForUser(callback);
    },500);
  } else {
    callback();
  }
}
  // $scope.User = User.getById("55c0b804b04519b813c10433", function() {
  waitForUser(function() {
    $scope.UsersStories = Story.get({user_id: $scope.User._id, _populate:"user_id"});
    // $scope.User = User.getById ("55c0b804b04519b813c10433") ;
  });


  // Log out function
  $scope.logoutUser = function(data) {
      Login.logout();
      console.log("User logged out!");
      $location.path('/');
    };



  $scope.userEdit = function() {
    $location.path('/userEdit');
    $scope.User = Login.user;
    console.log("User ",$scope.User.userName);
  };


  //Every time $scope.User.userName changes
  $scope.$watch("User.user_name",function(newVal, oldVal) {
    if ($scope.UserEditForm.user_name.$dirty) {
      console.log("$scope watch for logged in user", newVal, oldVal);
      $scope.userNameAlreadyRegistered = false;
      if (!newVal){return;}
      // check if userName is registered
      User.get({user_name:newVal},function(listOfUsers) {
        console.log("listOfUsers:", listOfUsers);
        if (listOfUsers.length) {
          //Make error message show
          console.log("Username exists");
          $scope.userNameAlreadyRegistered = true;
        }
      });
    }
  });

  //Every time $scope.User.email changes
  $scope.$watch("User.email",function(newVal,oldVal) {
    if ($scope.UserEditForm.userEmail.$dirty) {
      $scope.emailAlreadyRegistered = false;
      if(!newVal){return;}
      // check if email is registered
      User.get({email:newVal},function(listOfUsers) {
        //If users with that email exists
        if (listOfUsers.length) {
          // Make Error message show
          $scope.emailAlreadyRegistered = true;
        }
      });
    }
  });


  $scope.UserChanged = function() {
    console.log($scope.User);
    User.update({_id:$scope.User._id},$scope.User);
    $location.path('/user');
  };

  $scope.deleteStory = function(index){
    
    $scope.UsersStories[index].$remove(function(){
      $scope.UsersStories = Story.get({user_id: $scope.User._id, _populate:"user_id"});
    });
  };

}]);