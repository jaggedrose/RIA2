//"myAppName" controller.
app.controller("loginController", ["$http", "$scope", "$location","Login", function($http, $scope, $location, Login) {
  $scope.authMsg = '';
  $scope.Loginfo = {};

  $scope.logForm = function() {
    console.log("login",$scope.Loginfo);
    Login.login($scope.Loginfo, function(data) {
      console.log(data);
      if (!data._id) {
        $scope.authMsg = "Your email or password is incorrect!";
      } else {
        var id = data._id;
        console.log("userId: ", id);
        $location.path('/user');
      }
    });
  };

}]);
