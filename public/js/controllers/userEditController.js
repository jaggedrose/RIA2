// "Stories" user edit controller
app.controller("userEditController", ["$http", "$scope", "$location", "Story", "User", "Login", function($http, $scope, $location, Story, User, Login) {

   //get country data
   $http.get('js/resources/countries.json').then(function(res){
      $scope.countries = res.data;
   });

   console.log("User", User, "Login", Login);
   $scope.User = Login.user;
   console.log("UserEditController", $scope.User);

   //Every time $scope.User.userName changes
   $scope.$watch("User.user_name",function(newVal, oldVal) {
      if ($scope.UserEditForm.user_name.$dirty) {
         console.log("$scope watch for logged in user", newVal, oldVal);
         $scope.userNameAlreadyRegistered = false;
         if (!newVal){return;}
         // check if userName is registered
         User.get({user_name:newVal},function(listOfUsers) {
            console.log("listOfUsers:", listOfUsers);
            if (listOfUsers.length) {
               //Make error message show
               console.log("Username exists");
               $scope.userNameAlreadyRegistered = true;
            }
         });
      }
   });

   //Every time $scope.User.email changes
   $scope.$watch("User.email",function(newVal,oldVal) {
      if ($scope.UserEditForm.userEmail.$dirty) {
         $scope.emailAlreadyRegistered = false;
         if(!newVal){return;}
         // check if email is registered
         User.get({email:newVal},function(listOfUsers) {
            //If users with that email exists
            if (listOfUsers.length) {
               // Make Error message show
               $scope.emailAlreadyRegistered = true;
            }
         });
      }
   });


   $scope.UserChanged = function() {
      console.log($scope.User);
      User.update({_id:$scope.User._id},$scope.User);
      $location.path('/user');
   };

}]);