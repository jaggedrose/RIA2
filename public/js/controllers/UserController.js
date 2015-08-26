//"myAppName" controller.

app.controller("UserController", ["$http", "$scope", "$location", "Story", "User","Login","FileUploader", function($http, $scope, $location, Story, User, Login, FileUploader) {

  //$scope.User = Login.user;
  console.log("UserController", Login.user);

  function waitForUser(callback) {
    if (!Login.user._id) {
      setTimeout(function() {
        waitForUser(callback);
      },500);
    } else {
      callback();
    }
  }
  
  waitForUser(function() {
    $scope.UsersStories = Story.get({user_id: Login.user._id, _populate:"user_id"});
    $scope.User = User.getById(Login.user._id, function() {
      console.log("UserController :", $scope.User);
    });

  });

  $scope.profImage = '';

  $scope.$watch("files",function(){
    console.log("s", $scope);
    //console.log("s2", $scope.$parent);
    // If there is no file array or it has not length do nothing
    if(!$scope.files || $scope.files.length < 1){return;}
    // Otherwise upload the file properly
    FileUploader($scope.files[0]).success(function(imgurl) {
      $scope.User.img = imgurl;
      console.log("filnamn: ", $scope.files[0].name, "sökväg = ", $scope.User.img);
    });
  });

  $scope.save = function() {
    $scope.User.$update(function() {
      console.log("Saved new profile pic ", $scope.User);
    });
  };


  // Log out function
  $scope.logoutUser = function(data) {
      Login.logout();
      console.log("User logged out!");
      $location.path('/');
    };

  $scope.userEdit = function() {
    console.log("User ",$scope.User.userName);
     $location.path('/userEdit');
    // $scope.User = Login.user;
   
  };

  $scope.deleteStory = function(storyid){
    Story.remove({_id:storyid},function(){
       $scope.UsersStories = Story.get({user_id: $scope.User._id, _populate:"user_id"});
    });
  };

}]);