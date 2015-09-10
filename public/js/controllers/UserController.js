//"myAppName" controller.

app.controller("UserController", ["$http", "$scope", "$location", "Story", "User","Login","FileUploader", "$modal",
  function($http, $scope, $location, Story, User, Login, FileUploader, $modal) {

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
  
  var storyHash = {};
  waitForUser(function() {
    $scope.UsersStories = Story.get({user_id: Login.user._id, _populate:"user_id"}, function() {
      $scope.UsersStories.forEach(function(story, index) {
        storyHash[story._id] = {
          index: index,
          story:story
        };
      });
    });
    $scope.User = User.getById(Login.user._id, function() {
      delete $scope.User.password;
      console.log("UserController :", $scope.User);
    });

  });

  $scope.showSaveImgBtn = false;

  $scope.$watch("files",function(){
    console.log("s", $scope);
    //console.log("s2", $scope.$parent);
    // If there is no file array or it has not length do nothing
    if(!$scope.files || $scope.files.length < 1){return;}
    // Otherwise upload the file properly
    FileUploader($scope.files[0]).success(function(imgurl) {
      $scope.User.img = imgurl;
      $scope.showSaveImgBtn = true;
      console.log("filnamn: ", $scope.files[0].name, "sökväg = ", $scope.User.img);
    });
  });

  $scope.saveUserImg = function() {
    $scope.User.$update(function() {
      console.log("Saved new profile pic ", $scope.User);
      $scope.showSaveImgBtn = false;
    });
  };

  $scope.deleteUserImg = function() {
    $http.post('/api/removeImage', {imgsrc: $scope.User.img}).success(function() {
      $scope.User.img = "";

      delete $scope.User.password;
      $scope.User.$update(function() {
        console.log("Delete user img db updated: ", $scope.User);
      });

      console.log("Delete user img");
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

  $scope.scrollToStory = function(storyid) {
    $scope.$broadcast("storyDeleted", storyid);
  };

$scope.openModal = function(storyid) {
    //console.log("openModal !!!", imgName);
    var modalInstance = $modal.open({
      templateUrl: 'partials/deleteStory.html',
      controller: 'deleteStoryController',
      scope: $scope,
      resolve: {
      }
    });

    modalInstance.result.then(function() {
      // If user choose "Yes"-button
     Story.remove({_id:storyid},function(){
        $scope.UsersStories.splice(storyHash[storyid].index, 1);
        $scope.UsersStories.forEach(function(story, index) {
          storyHash[story._id] = {
            index: index,
            story:story
          };
        });
       
        //$scope.UsersStories = Story.get({user_id: $scope.User._id, _populate:"user_id"});
      });
       
    }, function () {
      // If user choose "No"-button
      //console.log("You choosed No-button");
    });
  };

  $scope.deleteStory = function(storyid){
    if (confirm("Do you really want delete so wonderful story?")) {
      Story.remove({_id:storyid},function(){
        $scope.UsersStories.splice(storyHash[storyid].index, 1);
        $scope.UsersStories.forEach(function(story, index) {
          storyHash[story._id] = {
            index: index,
            story:story
          };
        });
       
        //$scope.UsersStories = Story.get({user_id: $scope.User._id, _populate:"user_id"});
      });
    }
  };


}]);