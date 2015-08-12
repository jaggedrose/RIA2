//app declaration and dependency injection
var app = angular.module("stories", ["ngRoute", "ngResource", 'ngFileUpload', "ui.bootstrap"]);


//app config
app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
  //route config
  $routeProvider
    .when("/", {
      templateUrl: "partials/home.html",
      controller: "homeController"
    })
    .when("/register", {
      templateUrl: "partials/register.html",
      controller: "registerController"
    })
    .when("/fileUpload",{
      templateUrl: "partials/fileUpload.html",
      controller: "fileUploadController"
    })
    .when("/writeStory/:id?", {
      templateUrl: "partials/writeStory.html",
      controller: "storyController"
    })
    .when("/user", {
      templateUrl: "partials/user.html",
      controller: "UserController"
    })
    .when("/userEdit", {
      templateUrl: "partials/userEdit.html",
      controller: "UserController"
    })
    .when("/viewStory/:id", {
      templateUrl: "partials/viewStory.html",
      controller:"ViewStoryController"
    })
    .when("/login", {
      templateUrl: "partials/login.html",
      controller: "loginController"
    })
    .otherwise({
      redirectTo: "/"
    });

  $locationProvider.html5Mode(true);
}]);