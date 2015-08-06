//"myAppName" controller.
app.controller("UserController", ["$http", "$scope", "Story","User", function($http, $scope, Story, User) {
  /*$scope.newUser = User.create({
  	user_name: "hepp",
    first_name: "Graaaa",
    last_name: "Grasson",
    email: "graa@hotmail.com",
    stad: "Malmö",
    land: "Sverige",
    password: "1234"
  });*/

$scope.User = User.getById("55c0b6c2110d04b01e469f0a", function() {
  
  // $scope.User = User.getById ("55c0b804b04519b813c10433") ;
  $scope.UsersStories = Story.get({user_id: $scope.User._id, _populate:"user_id"});
}) ;

}]);