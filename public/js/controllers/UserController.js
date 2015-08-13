//"myAppName" controller.
app.controller("UserController", ["$http", "$scope", "Story","User","Login", function($http, $scope, Story, User, Login) {
  

$scope.User=Login.user;
hehehe = $scope.User;
console.log("UserController", Login.user);

function waitForUser(callback) {
  if (!$scope.User._id) {
    setTimeout(function() {
      waitForUser(callback);
    },500);
  } else {
    callback();
  }
}
  // $scope.User = User.getById("55c0b804b04519b813c10433", function() {
  waitForUser(function() {
    $scope.UsersStories = Story.get({user_id: $scope.User._id, _populate:"user_id"}, function() {
      $scope.UsersStories.sort(function(x, y) {
        var a = new Date(x.date_created);
        var b = new Date(y.date_created);
        return a>b ? -1 : a<b ? 1 : 0;
      });
    });
  })
    // $scope.User = User.getById ("55c0b804b04519b813c10433") ;
  // }) ;

  $scope.userEdit = function() {
    $location.path('/userEdit');
    $scope.User = Login.user;
    console.log("User ",$scope.User.userName);
  };

  $scope.UserChanged = function() {
    console.log($scope.User);
    User.update({_id:$scope.User._id},$scope.User);
    $location.path('/user');
  };
  
  $scope.deleteStory = function(index){
    
    $scope.UsersStories[index].$remove(function(){
      $scope.UsersStories = Story.get({user_id: $scope.User._id, _populate:"user_id"});
    });
  };

}]);

