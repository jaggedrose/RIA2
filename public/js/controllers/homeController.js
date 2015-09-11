app.filter('range', function() {
  return function(input, total) {
    
    for (var i=1; i<=total; i++)
      input.push(i);
    return input;
  };
});

app.controller("homeController", ["$http", "$scope", "$routeParams", "$location", "Story", "Login",
  function($http, $scope, $routeParams, $location, Story, Login) {

    var allStories = [];
    var pCount=0;
    Story.get(function(data){
        allStories = data.sort(function(x,y){
          return x.date_created > y.date_created ? -1 : 1;
        });
        pCount=Math.ceil(allStories.length/3);
        createCurrentPage(1);

    });


    function createCurrentPage(page){
      $scope.currentPageStories =  allStories.slice((page-1)*3,page*3);
        console.log(page,$scope.currentPageStories);
    }

    window.da = $scope;
  
  var currentPage = 1;

   $scope.prevPage = function() {
     console.log("Prev: ",currentPage+" "+ pCount);
    if (currentPage > 1) {
      currentPage--;
      createCurrentPage(currentPage);
    }
  };

   $scope.nextPage = function() {
     console.log("Next: ",currentPage+" "+ pCount);
     if (currentPage <= pCount) {
      currentPage++;
     
      createCurrentPage(currentPage);
    }
  };

  $scope.prevPageDisabled = function() {
    return currentPage === 1 ? "hidden" : "";
  };

  $scope.pageCount = function() {

    return Math.ceil(allStories.length/3);
  };

  $scope.nextPageDisabled = function() {
    return currentPage === pCount ? "hidden" : "";
  };

  // If there is a logged in user go to writestory otherwise go to login
  $scope.User = Login.user;

  $scope.$on("$routeChangeSuccess", function(event, next, current) {
    // If there is no logged in user, return to login page
    if (!Login.user._id && next.$$route.login && next.$$route.originalPath != "/") {
      event.preventDefault();
      $location.url("/login");
      return;
    }
  });

}]);