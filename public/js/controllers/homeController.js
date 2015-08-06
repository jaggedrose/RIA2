//"myAppName" controller.
app.controller("homeController", ["$http", "$scope", "Story","User", function($http, $scope, Story, User) {
  $scope.newUser = User.get();
  Story.get({_populate:"user_id"}, function(data) {
    console.log("d", data);
  })
}]);