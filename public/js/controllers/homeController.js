//"myAppName" controller.
app.filter('offset', function() {
  return function(input, start) {
    console.log(start)
    start = parseInt(start, 3);

    var result = input.slice(start);
    return result;
  };
});

app.controller("homeController", ["$http", "$scope", "Story","$routeParams","$location", 
  function($http, $scope, Story, $routeParams, $location) {

    $scope.AllStories = Story.get(function(){
        console.log(" AllStories");
    });


    window.da = $scope;

  $scope.itemsPerPage = 3;
  $scope.currentPage = 0;

   $scope.prevPage = function() {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
    }
  };

  $scope.prevPageDisabled = function() {
    return $scope.currentPage === 0 ? "disabled" : "";
  };

  $scope.pageCount = function() {
    return Math.ceil($scope.AllStories.length/$scope.itemsPerPage)-1;
  };

  $scope.nextPage = function() {
        console.log("Pages: ",$scope.pageCount());
    console.log("CurrPage 1: ",$scope.currentPage);

    if ($scope.currentPage < $scope.pageCount()) {
      $scope.currentPage++;
    }
    console.log("CurrPage: ",$scope.currentPage);
   
  };

  $scope.nextPageDisabled = function() {
    return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
  };

}]);