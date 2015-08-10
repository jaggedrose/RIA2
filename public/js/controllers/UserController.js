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
//    55c0b6c2110d04b01e469f0a
   
  $scope.User = User.getById("55c0b804b04519b813c10433", function() {
    
    // $scope.User = User.getById ("55c0b804b04519b813c10433") ;
    $scope.UsersStories = Story.get({user_id: $scope.User._id, _populate:"user_id"});
  }) ;

  $scope.userEdit = function() {
    window.location.assign("http://"+window.location.host+'/userEdit');
    $scope.User = User.getById("55c0b804b04519b813c10433");
    console.log("User ",$scope.User.userName);
  };

  $scope.UserChanged = function() {
    console.log($scope.User);
    User.update({_id:$scope.User._id},$scope.User);
    window.location.assign("http://"+window.location.host+'/user');
  };

}]);

