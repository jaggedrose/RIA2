//"myAppName" controller.
app.controller("logInController", ["$http", "$scope", "$location", function($http, $scope, $location) {
  $scope.authMsg = '';
  $scope.Loginfo = {};
  
  $scope.logForm = function(){
    console.log("login",$scope.Loginfo);
    $http
      .post('api/login',{email:$scope.Loginfo.email, password: $scope.Loginfo.password})
        .then(function(response){
          if(!response.login){
            $scope.autMsg = response;
          }else{}

        });
  }

 
    
        


    
}]);
