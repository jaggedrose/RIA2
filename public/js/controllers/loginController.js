//Login controller.
app.controller("loginController", ["$http", "$scope", "$location","Login", function($http, $scope, $location, Login) {
  $scope.authMsg = '';
  $scope.Loginfo = {};
  $scope.User = Login.user;

  // if logged in already goto the user page
  if($scope.User.user_name){
    $location.path("/user");
  }

  //on login-form submit
  $scope.logForm = function() {
    Login.login($scope.Loginfo, function(data) {
      if (!Login.user._id) {
        $scope.authMsg = "Your email or password is incorrect!";
      } else {
        var id = data._id;
        $location.path('/user');
      }
    });
  };

}]);
