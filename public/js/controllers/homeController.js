//"myAppName" controller.
app.controller("homeController", ["$http", "$scope", "Story","User", function($http, $scope, Story, User) {
  /*$scope.newUser = User.create({
  	user_name: "hepp",
    first_name: "Graaaa",
    last_name: "Grasson",
    email: "graa@hotmail.com",
    stad: "Malmö",
    land: "Sverige",
    password: "1234"
  });*/
  $scope.newUser = User.get();
  Story.get({_populate:"user_id"}, function(data) {
    console.log("d", data);
  })
}]);