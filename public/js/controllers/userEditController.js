// "Stories" user edit controller
app.controller("userEditController", ["$http", "$scope", "$location", "Story", "User", "Login", function($http, $scope, $location, Story, User, Login) {
 
   //get country data
   $http.get('js/resources/countries.json').then(function(res){
      $scope.countries = res.data;
   });

   $scope.orgUserData = '';
   $scope.User = User.getById(Login.user._id,  function() {
      $scope.User.password = "+-+-+-+";
      $scope.password2 = "+-+-+-+";
      $scope.orgUserData = angular.copy($scope.User);
      $scope.originalUserName = $scope.orgUserData.user_name;
      $scope.originalEmail = $scope.orgUserData.email;
   });

   //resetForm to userData on start
   $scope.resetForm = function() {
      $scope.User = angular.copy($scope.orgUserData);
      //set form to untouched state
      $scope.UserEditForm.$setPristine();

   };

   //Every time $scope.User.userName changes
   $scope.$watch("User.user_name",function(newVal, oldVal) {
      if (!$scope.User.user_name) { return; }
      //do username lowercase
      $scope.User.user_name = $scope.User.user_name.toLowerCase();
      if ($scope.UserEditForm.user_name.$dirty && $scope.UserEditForm.user_name.$viewValue != $scope.originalUserName) {
         if (!newVal){return;}
         // check if userName is registered
         User.get({user_name:newVal},function(listOfUsers) {
            if (listOfUsers.length) {
               //Make error message show
               $scope.UserEditForm.user_name.$setValidity("unique", false);
            }else {
               $scope.UserEditForm.user_name.$setValidity("unique", true);
            }
         });
      }
   });

   //Every time $scope.User.email changes
   $scope.$watch("User.email",function(newVal,oldVal) {
      if ($scope.UserEditForm.email.$dirty && $scope.UserEditForm.email.$viewValue != $scope.originalEmail) {
         if(!newVal){return;}
         // check if email is registered
         User.get({email:newVal},function(listOfUsers) {
            //If users with that email exists
            if (listOfUsers.length) {
               // Make Error message show
               $scope.UserEditForm.email.$setValidity("unique", false);
            }else {
               $scope.UserEditForm.email.$setValidity("unique", true);
            }
         });
      }
   });

   //When word in password-inputs changes to valid word
   function passwordWatch() {
      if($scope.User.password == $scope.password2){
         //make form item valid
         $scope.UserEditForm.password.$setValidity("identical", true);
      }else {
         $scope.UserEditForm.password.$setValidity("identical", false);
      }
   }

   //Whenever these two changes - run pwdWatch
   $scope.$watch("User.password", passwordWatch);
   $scope.$watch("password2", passwordWatch);

   //on userEdit-Form-Submit
   $scope.UserChange = function() {

      //if userData is unchanged - return
      if($scope.User == $scope.orgUserData) {
         return;
      }
          
      //if the password is the same as we made it on boot or empty
      if($scope.User.password == "+-+-+-+" || $scope.User.password === ""){
         //remove the entire property from User - then it won't re-save a new password at all
         delete $scope.User.password;
      }
      //make username toLowerCase
      $scope.User.user_name = $scope.User.user_name.toLowerCase();
      //update user
      User.update({_id:$scope.User._id},$scope.User);
      //get users updated information
      Login.check($scope.User);
      //show userpage
      $location.path('/user');
   };

}]);