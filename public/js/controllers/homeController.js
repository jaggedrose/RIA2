//"myAppName" controller.
app.controller("homeController", ["$http", "$scope", "User", function($http, $scope, User) {
  $scope.newUser = User.create({
  	user_name: "hepp",
    first_name: "Graaaa",
    last_name: "Grasson",
    email: "graa@hotmail.com",
    stad: "Malmö",
    land: "Sverige",
    password: "1234"
  });
}]);