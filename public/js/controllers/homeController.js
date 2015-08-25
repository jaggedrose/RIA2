app.filter('range', function() {
  return function(input, total) {
    
    for (var i=1; i<=total; i++)
      input.push(i);
    return input;
  };
});

app.controller("homeController", ["$http", "$scope", "Story","$routeParams","$location", 
  function($http, $scope, Story, $routeParams, $location) {

    var allStories = [];
    Story.get(function(data){
        allStories = data.sort(function(x,y){
          return x.date_created > y.date_created ? -1 : 1;
        });
        createCurrentPage(1);

    });


    function createCurrentPage(page){
      $scope.currentPageStories =  allStories.slice((page-1)*3,page*3);
        console.log(page,$scope.currentPageStories);
    }

    window.da = $scope;

  var currentPage = 1;  

   $scope.prevPage = function() {
     console.log("Prev: ",currentPage+" "+ $scope.pageCount());
    if (currentPage > 1) {
      currentPage--;
      createCurrentPage(currentPage);
    }
  };

   $scope.nextPage = function() {
     console.log("Next: ",currentPage+" "+ $scope.pageCount());
     if (currentPage <= $scope.pageCount()) {
      currentPage++;
     
      createCurrentPage(currentPage);
    }
  };
  
  $scope.setPage = function(nPage) {
         currentPage=nPage;
      createCurrentPage(currentPage);
    };

  $scope.prevPageDisabled = function() {
    return currentPage === 1 ? "disabled" : "";
  };

  $scope.pageCount = function() {

    return Math.ceil(allStories.length/3);
  };


  $scope.nextPageDisabled = function() {
    return currentPage === $scope.pageCount() ? "disabled" : "";
  };

}]);