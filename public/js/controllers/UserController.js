//User controller
app.controller("UserController", ["$http", "$scope", "$location", "Story", "User","Login","FileUploader", "$modal",
  function($http, $scope, $location, Story, User, Login, FileUploader, $modal) {

  //Delay to have time to recieve user
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
    });
  });

  $scope.showSaveImgBtn = false;

  $scope.$watch("files",function(){
    // If there is no file array or it has not length do nothing
    if(!$scope.files || $scope.files.length < 1){return;}
    // Otherwise upload the file properly
    FileUploader($scope.files[0]).success(function(imgurl) {
      $scope.User.img = imgurl;
      $scope.showSaveImgBtn = true;
    });
  });

  //Save user image
  $scope.saveUserImg = function() {
    $scope.User.$update(function() {
      $scope.showSaveImgBtn = false;
    });
  };

  //Delete user image
  $scope.deleteUserImg = function() {
    $http.post('/api/removeImage', {imgsrc: $scope.User.img}).success(function() {
      $scope.User.img = "";
      delete $scope.User.password;
      $scope.User.$update(function() {
      });
    });
  };

  // Log out function
  $scope.logoutUser = function(data) {
      Login.logout();
      $location.path('/');
    };

  //Moving to userEdit view
  $scope.userEdit = function() {
     $location.path('/userEdit');
  };

  $scope.scrollToStory = function(storyid) {
    $scope.$broadcast("storyDeleted", storyid);
  };

  //Open modal to confirm story deletion
  $scope.openModal = function(storyid) {
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
      });
       
    }, function () {
      // If user choose "No"-button
    });
  };

}]);