//Controller for menu
app.controller("menuController", ["$scope", "$location", "Login", "UserStore", "Story", function($scope, $location, Login, UserStore, Story) {

   $scope.User = Login.user;
   
   // Listening for any route changes,
   // depending on if a user is logged in or not.
   $scope.$on("$routeChangeStart", function(event, next, current) {

      // if users are leaving the "writeStory" route,
      // delete all "unsaved" stories
      var nextPage = next.$$route.originalPath.indexOf("writeStory/") >= 0;
      if (UserStore.tmp.stories && !nextPage) {
         for (var i in UserStore.tmp.stories) {
            Story.remove({_id: i}, function(data) {
               console.log("deleted " + i);
               delete UserStore.tmp.stories[i];
            });
         }
      }

      // If there is no logged in user, return to login page
      if (!Login.user._id && next.$$route.login && next.$$route.originalPath != "/") {
         event.preventDefault();
         $location.url("/login");
         return;
      }

      //NOT DONE!
      //Waiting for Hugos answer on how to wait for recieveing the user on load
      if (Login.user._id && next.$$route.originalPath == "/login") {
         event.preventDefault();
         $location.url("/");
         return;
      }
   });

}]);