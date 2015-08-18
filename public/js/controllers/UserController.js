//"myAppName" controller.
app.controller("UserController", ["$http", "$scope", "$location", "Story", "User","Login", function($http, $scope, $location, Story, User, Login) {
  

  $scope.User = Login.user;
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


  

  $scope.deleteStory = function(index){
    
    $scope.UsersStories[index].$remove(function(){
      $scope.UsersStories = Story.get({user_id: $scope.User._id, _populate:"user_id"});
    });
  };

}]);