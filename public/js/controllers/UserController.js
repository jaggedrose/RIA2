//"myAppName" controller.
app.controller("UserController", ["$http", "$scope", "Story","User", function($http, $scope, Story, User) {
  


  $scope.User = User.getById("55c0b804b04519b813c10433", function() {
    
    // $scope.User = User.getById ("55c0b804b04519b813c10433") ;
    $scope.UsersStories = Story.get({user_id: $scope.User._id, _populate:"user_id"}, function() {
    });
  }) ;

  $scope.userEdit = function() {
    $location.path('/userEdit');
    $scope.User = User.getById("55c0b804b04519b813c10433");
    console.log("User ",$scope.User.userName);
  };

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

