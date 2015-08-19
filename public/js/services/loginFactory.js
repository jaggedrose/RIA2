// login factory
app.factory("Login",["$http", "$rootScope", "$location", function($http, $rootScope, $location){

  // a function to empty and fill an object
  // without loosing the reference to it
  function updateObj(inObj, outObj) {
    if (JSON.stringify(inObj) !== JSON.stringify(outObj)) {
      for (var i in outObj) {
        delete outObj[i];
      }

      for (var i in inObj) {
        outObj[i] = inObj[i];
      }
    }
  }

  var loginObj = {
    user: {},
    login: function(credentials, callback) {
      $http.post('api/login', credentials).success(function(data) {
        updateObj(data ? data : {}, loginObj.user);
        // let the entire app know we are logged in
        $rootScope.$broadcast("login");

        callback && callback(loginObj.user);
      });
    },
    check: function(callback) {
      $http.get('api/login').success(function(data) {
        updateObj(data ? data : {}, loginObj.user);

        callback && callback(loginObj.user);
      });
    },
    logout: function(callback) {
      $http.delete('api/login').success(function(data) {
        updateObj({}, loginObj.user);
        
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