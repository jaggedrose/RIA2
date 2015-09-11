//search controller.
app.controller("searchController", ["$http", "$scope", "$location", "Tag", "User", "Story", "UserStore", function($http, $scope, $location, Tag, User, Story, UserStore) {

  $scope.show = "tags";

  //User-search tab chosen
  $scope.activateSearchUsers = function(){
    $scope.show = "users";
    $scope.searchText = '';
    $scope.searchResults = "";
    $scope.currentPageStories = '';
    $scope.pageshown = false;
  };
  
  //Tag-search tab chosen
  $scope.activateSearchTags = function(){
    $scope.show = "tags";
    $scope.searchText = '';
     $scope.searchResults = "";
    $scope.currentPageStories = '';
    $scope.pageshown = false;
  };

  //Search function that runs on input change
  $scope.search = function() {
    UserStore.tmp.search = {};
    UserStore.tmp.search[$scope.show] = $scope.searchText;

     switch ($scope.show) {
        case 'users':
            $scope.data="";
            $scope.currentPageStories='';
           if ($scope.searchText.length>0) {
          User.get({user_name: new RegExp($scope.searchText, 'i')}, function(data) {
            $scope.searchResults = data;
             $scope.hashtag=("");
          });
        }
        break;

        case 'tags':
            $scope.data="";
            $scope.currentPageStories='';
           if ($scope.searchText.length>0) {
          Tag.get({tagName: new RegExp($scope.searchText, 'i')}, function(data) {
            $scope.searchResults = data;
            $scope.hashtag=("#");
          });
        }
        break;

        default:
          Story.get({title: new RegExp($scope.searchText, 'i')}, function(data) {
            $scope.searchResults = data;
          });

      }
    };

  
  if (UserStore.tmp.search) {
    for (var i in UserStore.tmp.search) {
      if (UserStore.tmp.search.hasOwnProperty(i)) {
        $scope.show = i;
        $scope.searchText = UserStore.tmp.search[i];
        $scope.search();
        break;
      }
    }
  }
  var pCount = 0;

  //Takes user to view with stories belonging to that tag
  $scope.searchStories = function(tagid,tagName){
    var data;
    $scope.data = Story.get({tags:tagid,_populate:"tags"}, function() {
      pCount = Math.ceil($scope.data.length/3);
      $scope.pageshown = pCount>1 ? true: false;
      $scope.searchText = ("#") + tagName ;
      $scope.searchResults ="";
      createCurrentPage(1);
    });
  };

  // Takes you to the users profile page
  $scope.searchUsers = function(userid, user_name) {
    $location.path('/userProfile/' + userid);
  };

  /*CODE BELOW FOR PAGINATION OF SEARCH RESULT*/
  
 function createCurrentPage(page){
      $scope.currentPageStories =  $scope.data.slice((page-1)*3,page*3);
    }

  var currentPage = 1;

   $scope.prevPage = function() {
    if (currentPage > 1) {
      currentPage--;
      createCurrentPage(currentPage);
    }
  };

   $scope.nextPage = function() {
     if (currentPage <= pCount) {
      currentPage++;  
      createCurrentPage(currentPage);
    }
  };
  
  $scope.prevPageDisabled = function() {
    return currentPage === 1 ? "hidden" : "";
  };

  $scope.nextPageDisabled = function() {
    return currentPage >= pCount ? "hidden" : "";
  };

}]);