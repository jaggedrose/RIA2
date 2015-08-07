//"myAppName" controller.
app.controller("homeController", ["$http", "$scope", "Story","Login", function($http, $scope, Story, Login) {
  /*$scope.newUser = User.create({
  	user_name: "hepp",
    first_name: "Graaaa",
    last_name: "Grasson",
    email: "graa@hotmail.com",
    stad: "Malmö",
    land: "Sverige",
    password: "1234"
  });*/
  if (Login.user()) {
    $scope.user = Login.user();
    Story.get({user_id: $scope.user._id, _populate:"user_id"}, function(data) {
      console.log("d", data);
    })
  }
}]);