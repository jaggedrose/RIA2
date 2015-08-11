app.factory("Login",["$http",function($http){
  var currentUser = false;

  var loginObj = {
    user: function() { return currentUser; },
    login: function(credentials, callback) {
      $http.post('api/login', credentials).success(function(data) {
        currentUser = data ? data : false;
        callback(currentUser);
      });
    },
    check: function(callback) {
      $http.get('api/login').success(function(data) {
        currentUser = data ? data : false;
        callback(currentUser);
      });
    },
    logout: function(callback) {
      $http.delete('api/login').success(function(data) {
        currentUser = false;
        callback(currentUser);
      });
    }
  };

  // check if logged in every 5 seconds
  setInterval(function() {
    loginObj.check(function(){});
  }, 5000);

  return loginObj;
}]);