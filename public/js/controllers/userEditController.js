// "Stories" user edit controller
app.controller("userEditController", ["$http", "$scope", "$location", "Story", "User", "Login", function($http, $scope, $location, Story, User, Login) {

   console.log("UserEditController");

    
   //get country data
   $http.get('js/resources/countries.json').then(function(res){
      $scope.countries = res.data;
   });

   //console.log("User", User, "Login", Login);

   $scope.orgUserData = Login.user;
   
   $scope.$watch("orgUserData._id",function(){
      // Since Login.user is originally empty wait for it to have an id
      // then clone to $scope.User in order to have a copy that won't change 
      // on every logIn-check.
      $scope.User = JSON.parse(JSON.stringify(Login.user));
      //set users password to something because we want to show bullets in input
      $scope.User.password = "+-+-+-+";
   });


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

   //on userEdit-Form-Submit
   $scope.UserChange = function() {
      console.log($scope.User);
      //if the password is the same as we made it on line 19
      if($scope.User.password == "+-+-+-+"){
         //remove the entire property from User - then it wont save a new password at all
         delete $scope.User.password;
      }
      //update user
      User.update({_id:$scope.User._id},$scope.User);
      //get users updated information
      Login.check($scope.User);
      //show userpage
      $location.path('/user');
   };

}]);