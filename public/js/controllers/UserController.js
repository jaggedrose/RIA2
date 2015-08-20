//"myAppName" controller.

app.controller("UserController", ["$http", "$scope", "$location", "Story","Login", function($http, $scope, $location, Story, Login) {

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
  
  waitForUser(function() {
    $scope.UsersStories = Story.get({user_id: $scope.User._id, _populate:"user_id"});
    // $scope.User = User.getById ("55c0b804b04519b813c10433") ;
    //console.log("UserController :", $scope.User);

  });

  // Log out function
  $scope.logoutUser = function(data) {
      Login.logout();
      console.log("User logged out!");
      $location.path('/');
    };

  $scope.userEdit = function() {
    console.log("User ",$scope.User.user_name);
     $location.path('/userEdit');
    // $scope.User = Login.user;   
  };

  $scope.deleteStory = function(storyid){
    Story.remove({_id:storyid},function(){
       $scope.UsersStories = Story.get({user_id: $scope.User._id, _populate:"user_id"});
    });
  };

}]);