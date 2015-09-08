//app declaration and dependency injection
var app = angular.module("stories", ["ngRoute", "ngResource", 'ngFileUpload', "ui.bootstrap","ngSanitize","ngTouch", "superswipe", "cropme",'ngMaterial','ngMdIcons']);



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
    .when("/writeStory/:id", {
      redirectTo: "/writeStory/:id/section/1"
    })
    .when("/writeStory", {
      redirectTo: "/writeStory/new/section/1",
      login: true // route is login protected
    })
    .when("/writeStory/:id/section/:sectionid", {
      templateUrl: "partials/writeStory.html",
      controller: "storyController"
    })
    .when("/user", {
      templateUrl: "partials/user.html",
      controller: "UserController",
      login: true // route is login protected
    })
    .when("/userEdit", {
      templateUrl: "partials/userEdit.html",
      controller: "userEditController"
    })
    .when("/viewStory/:id", {
      redirectTo: "/viewStory/:id/section/1"
    })
    .when("/viewStory/:id/section/:sectionid", {
      templateUrl: "partials/viewStory.html",
      controller:"ViewStoryController"
    })
    .when("/login", {
      templateUrl: "partials/login.html",
      controller: "loginController"
    })
    .when("/search", {
      templateUrl: "partials/search.html",
      controller: "searchController"
    })
    .when("/userProfile/:id", {
      templateUrl: "partials/userProfile.html",
      controller: "userProfileController"
    })
    .when("/FAQ", {
      templateUrl: "partials/FAQ.html",
      controller: "FaqController"
    })
    .otherwise({
      redirectTo: "/"
    });

  $locationProvider.html5Mode(true);
}]);