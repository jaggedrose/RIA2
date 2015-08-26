
app.controller("userProfileController", ["$http", "$scope", "$routeParams", "Story", "User", function($http, $scope, $routeParams, Story, User) {
   console.log("userProfileController is working!");

   // Get id from user list on search page
   var id = $routeParams.id;
   console.log("Userid: ", id);

   // Get user info by id
   $scope.User = User.getById({_id: id});
   // Get stories written by user
   $scope.UsersStories = Story.get({user_id: id, _populate:"user_id"});

}]);