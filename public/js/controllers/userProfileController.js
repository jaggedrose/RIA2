
app.controller("userProfileController", ["$http", "$scope", "$routeParams", "Story", "User", function($http, $scope, $routeParams, Story, User) {
   console.log("userProfileController is working!");


   var id = $routeParams.id;
   console.log("Userid: ", id);
   $scope.User = User.getById({_id: id});
   $scope.UsersStories = Story.get({user_id: $scope.User._id, _populate:"user_id"});


}]);