//"myAppName" controller.
app.controller("searchController", ["$http", "$scope", "Tag","User", function($http, $scope,Tag, User) {

  $scope.show = "tags";
  
  $scope.activateSearchUsers = function(){
    $scope.show = "users";
    $scope.searchText = '';
    $scope.search();
  };
  
  $scope.activateSearchTags = function(){
    $scope.show = "tags";
    $scope.searchText = '';
    $scope.search();
  };

  $scope.search = function() {
    switch ($scope.show) {
      case 'users':
        User.get({user_name: new RegExp($scope.searchText, 'i')}, function(data) {
          console.log("got users", data);
          $scope.searchResults = data;
        });
        break;

      case 'tags':
        Tag.get({tagName: new RegExp($scope.searchText, 'i')}, function(data) {
          console.log("got tags", data);
          $scope.searchResults = data;
        });
        break;

      default:
        Story.get({title: new RegExp($scope.searchText, 'i')}, function(data) {
          console.log("got stories", data);
          $scope.searchResults = data;
        });
    }
  };

  //$scope.search();
}]);