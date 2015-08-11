//app declaration and dependency injection
var app = angular.module("stories", ["ngRoute", "ngResource", "ngFileUpload", "ui.bootstrap"]);

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