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

var pCount = 0;

  $scope.searchStories = function(tagid,tagName){
    console.log("tagName",tagName);
    var data;
    $scope.data = Story.get({tags:tagid,_populate:"tags"}, function() {
      pCount=Math.ceil($scope.data.length/3);
      console.log("data", $scope.data);    
      $scope.searchText = ("#") + tagName ;
      $scope.searchResults ="";
      createCurrentPage(1);
    });
      

    
  };

 function createCurrentPage(page){
      $scope.currentPageStories =  $scope.data.slice((page-1)*3,page*3);
        console.log(page,$scope.currentPageStories);
    }


  var currentPage = 1;

   $scope.prevPage = function() {
     console.log("Prev: ",currentPage+" "+ pageCount);
    if (currentPage > 1) {
      currentPage--;
      createCurrentPage(currentPage);
    }
  };

   $scope.nextPage = function() {
     console.log("Next: ",currentPage+" "+ pageCount);
     if (currentPage <= pageCount) {
      currentPage++;
     
      createCurrentPage(currentPage);
    }
  };
  
  $scope.prevPageDisabled = function() {
    return currentPage === 1 ? "disabled" : "";
  };

 function pageCount() {
 
    return pCount;
    // Math.ceil($scope.data.length/3);
  }


  $scope.nextPageDisabled = function() {
    return currentPage === pageCount ? "disabled" : "";
  };

  //$scope.search();
}]);