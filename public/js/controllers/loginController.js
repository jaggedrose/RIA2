//"myAppName" controller.
app.controller("loginController", ["$http", "$scope", "$location","Login", function($http, $scope, $location, Login) {
  $scope.authMsg = '';
  $scope.Loginfo = {};
  $scope.User = Login.user;

  $scope.logForm = function() {
    console.log("login",$scope.Loginfo);
    Login.login($scope.Loginfo, function(data) {
      console.log("Is there data? ", data.length);
      if (!Login.user._id) {
        $scope.authMsg = "Your email or password is incorrect!";
      } else {
        var id = data._id;
        console.log("userId: ", id);
        $location.path('/user');
      }
    });
  };

  $scope.gotoRegister = function(){
    $location.path('/register');
  };

    // $scope.logoutUser = function(data) {
    //   Login.logout();
    //   console.log("User logged out!");
    //   $location.path('/');
    // };

}]);
