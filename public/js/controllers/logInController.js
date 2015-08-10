//"myAppName" controller.
app.controller("loginController", ["$http", "$scope", "$location","Login", function($http, $scope, $location, Login) {
  $scope.authMsg = '';
  $scope.Loginfo = {};
  
  $scope.logForm = function(){
    console.log("login",$scope.Loginfo);
    Login.login($scope.Loginfo, function(data){
      if(!data){
        $scope.authMsg = "you entered wrong email or password";
      }else{
        var id = data._id;
        $location.path('/home');
      }
    });
  };
}]);
