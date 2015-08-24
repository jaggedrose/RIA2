
app.controller("menuController", ["$scope", "$location", "Login", function($scope, $location, Login) {
   console.log("menuController is working!");

   $scope.User = Login.user;

   // Listening for any route changes,
   // depending on if a user is logged in or not.
   $scope.$on("$routeChangeSuccess", function(event, next, current) {
      // If there is no logged in user, return to login page
      if (!Login.user._id && next.$$route.login && next.$$route.originalPath != "/") {
         event.preventDefault();
         $location.url("/login");
         return;
      }

   });

}]);