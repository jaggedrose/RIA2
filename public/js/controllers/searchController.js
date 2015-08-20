//"myAppName" controller.
app.controller("searchController", ["$http", "$scope", "Story", function($http, $scope, Story) {

  
  $scope.showtags = true;
  
  $scope.activateSearchUsers = function(){
    $scope.showtags = false;
    $scope.showusers = true;
  };
  $scope.activateSearchTags = function(){
    $scope.showusers = false;
    $scope.showtags = true;
  };

  $scope.search = function() {
    Story.get({title: new RegExp(sss ? sss : $scope.searchInput, 'i')}, function(data) {
      console.log("got data", data);
    });
  };

  
}]);