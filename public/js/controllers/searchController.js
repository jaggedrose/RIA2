//"myAppName" controller.
app.controller("searchController", ["$http", "$scope", "Tag","User","Story", function($http, $scope, Tag, User, Story) {

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
        $scope.data="";
        User.get({user_name: new RegExp($scope.searchText, 'i')}, function(data) {
          console.log("got users", data);
          $scope.searchResults = data;
           $scope.hashtag=("");
        });
        break;

      case 'tags':
        $scope.data="";
        Tag.get({tagName: new RegExp($scope.searchText, 'i')}, function(data) {
          console.log("got tags", data);
          $scope.searchResults = data;
          $scope.hashtag=("#");
        });
        break;

      default:
        Story.get({title: new RegExp($scope.searchText, 'i')}, function(data) {
          console.log("got stories", data.title);
          $scope.searchResults = data;
        });
    }
  };

  $scope.searchStories = function(tagid,tagName){
    console.log("tagName",tagName);
    var data;
    $scope.data = Story.get({tags:tagid,_populate:"tags"});
      console.log("data", $scope.data);    
      $scope.searchText = ("#") + tagName ;
      $scope.searchResults ="";
      
      

    
  };

  //$scope.search();
}]);