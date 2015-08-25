// "Stories" user edit controller
app.controller("userEditController", ["$http", "$scope", "$location", "Story", "User", "Login", function($http, $scope, $location, Story, User, Login) {

   console.log("UserEditController");

    
   //get country data
   $http.get('js/resources/countries.json').then(function(res){
      $scope.countries = res.data;
   });

   //console.log("User", User, "Login", Login);

   $scope.User = User.getById(Login.user._id,  function() {
      $scope.User.password = "+-+-+-+";
      $scope.password2 = "+-+-+-+";
      $scope.orgUserData = angular.copy($scope.User);
      $scope.originalUserName = $scope.orgUserData.user_name;
      $scope.originalEmail = $scope.orgUserData.email;
   });
   // Since Login.user is originally empty wait for it to have an id
  /* $scope.orgUserData = Login.user;
   $scope.$watch("orgUserData._id", modifyScopeUser);

   function modifyScopeUser(){
      //clone to $scope.User in order to have a copy that won't change on every logIn-check.
      $scope.User = JSON.parse(JSON.stringify(Login.user));
      //set users password to something because we want to show bullets in input
      $scope.User.password = "+-+-+-+";
      $scope.password2 = "+-+-+-+";
      
      console.log("Login.user.user_name", Login.user.user_name);
      $scope.originalUserName = angular.copy(Login.user.user_name);
      $scope.originalEmail = angular.copy(Login.user.email);
      console.log("$scope.originalUserName", $scope.originalUserName);
   }*/

   //resetForm-function
   $scope.resetForm = function() {
      console.log("Reset form function");
      $scope.orgUserData = Login.user;
      modifyScopeUser();
      //set form to untouched state
      $scope.UserEditForm.$setPristine();

   };

   //Every time $scope.User.userName changes
   $scope.$watch("User.user_name",function(newVal, oldVal) {
      if (!$scope.User.user_name) { return; }
      console.log("uu", $scope.User.user_name);
      //do username lowercase
      $scope.User.user_name = $scope.User.user_name.toLowerCase();
      //console.log("names in watch", $scope.UserEditForm.user_name.$viewValue, $scope.originalUserName);
      if ($scope.UserEditForm.user_name.$dirty && $scope.UserEditForm.user_name.$viewValue != $scope.originalUserName) {
         console.log("watch for user name :", $scope.originalUserName);
         if (!newVal){return;}
         // check if userName is registered
         User.get({user_name:newVal},function(listOfUsers) {
            console.log("listOfUsers:", listOfUsers);
            if (listOfUsers.length) {
               //Make error message show
               console.log("Username exists");
               //$scope.userNameAlreadyRegistered = true;
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
      console.log("Password watch function");
      if($scope.User.password == $scope.password2){
         //make form item valid
         $scope.UserEditForm.password.$setValidity("identical", true);
         console.log("they are the same");
      }else {
         $scope.UserEditForm.password.$setValidity("identical", false);
         console.log("they are not the same");
      }
   }

   //Whenever these two changes - run pwdWatch
   $scope.$watch("User.password", passwordWatch);
   $scope.$watch("password2", passwordWatch);

   //on userEdit-Form-Submit
   $scope.UserChange = function() {

      //if userData is unchanged - return
      if($scope.User == $scope.orgUserData) {
         //make form invalid!
         return;
      }
          
      console.log($scope.User);
      //if the password is the same as we made it on line 19 OR empty
      if($scope.User.password == "+-+-+-+" || $scope.User.password === ""){
         //remove the entire property from User - then it won't save a new password at all
         delete $scope.User.password;
      }
      //make username toLowerCase
      $scope.User.user_name = $scope.User.user_name.toLowerCase();
      console.log("username after toLowerCase", $scope.User.user_name);
      //update user
      User.update({_id:$scope.User._id},$scope.User);
      //get users updated information
      Login.check($scope.User);
      //show userpage
      $location.path('/user');
   };

}]);