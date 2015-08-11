//app declaration and dependency injection
<<<<<<< HEAD
var app = angular.module("stories", ["ngRoute", "ngResource", 'ngFileUpload', "ui.bootstrap"]);
=======
var app = angular.module("stories", ["ngRoute", "ngResource", "ngFileUpload", "ui.bootstrap"]);
>>>>>>> master

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
    .when("/writeStory", {
      templateUrl: "partials/writeStory.html",
      controller: "storyController"
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