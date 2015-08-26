// login factory
app.factory("Login",["$http", "$rootScope", "$location", function($http, $rootScope, $location){


  // Never ever change which object loginObj.user is once it has been created
  // since the will break references to the object from $scope.User etc in different controllers
  function updateUserObj(toClone){
    for(var i in loginObj.user){
      delete loginObj.user[i];
    }
    for(i in toClone){
      loginObj.user[i] = toClone[i];
    }
    console.log("UPDATED USER OBJ",loginObj.user)
  }


  var loginObj = {
    user: {},
    login: function(credentials, callback) {
      $http.post('api/login', credentials).success(function(data) {
        updateUserObj(data);
        // let the entire app know we are logged in
        $rootScope.$broadcast("login");

        callback && callback(loginObj.user);
      });
    },
    check: function(callback) {
      if(typeof callback == "object"){updateUserObj(callback);return;}
      $http.get('api/login').success(function(data) {
        updateUserObj(data);
        callback && callback(loginObj.user);
      });
    },
    logout: function(callback) {
      $http.delete('api/login').success(function(data) {
        updateUserObj(data);
        
        // let the entire app know we are logged out
        $rootScope.$broadcast("logout");

        callback && callback(loginObj.user);
      });
    }
  };


  // check if logged in every 30 seconds
  loginObj.check(function() {
    if (!loginObj.user._id) {
      // let the entire app know we are logged out
      $rootScope.$broadcast("logout");
    }
  });
  setInterval(function() {
    loginObj.check(function(){
    if (!loginObj.user._id) {
      // let the entire app know we are logged out
      $rootScope.$broadcast("logout");
    }
    });
  }, 30000);


  return loginObj;
}]);