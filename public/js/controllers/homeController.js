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
  // $scope.onSwipeLeft= function() {
  //        console.log("Next: ",currentPage+" "+ $scope.pageCount());
  //   if (currentPage <= $scope.pageCount()) {
  //     currentPage++;
         
  //     createCurrentPage(currentPage);
  //   }
  // };

  // $scope.storySection = function(storyId){
  //   $location.path('/viewStory/' + storyId + "/section/"+ 1 );

  // };

  // $scope.onSwipeRight = function() {
  //    console.log("Prev: ",currentPage+" "+ $scope.pageCount());
  //   if (currentPage > 1) {
  //     currentPage--;
  //     createCurrentPage(currentPage);
  //   }
  // };
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
  
  // $scope.setPage = function(nPage) {
  //        currentPage=nPage;
  //     createCurrentPage(currentPage);
  //   };

  $scope.prevPageDisabled = function() {
    return currentPage === 1 ? "hidden" : "";
  };

  $scope.pageCount = function() {

    return Math.ceil(allStories.length/3);
  };

  $scope.nextPageDisabled = function() {
    return currentPage === pCount ? "hidden" : "";
  };

  $scope.goToFAQ = function(){
    $location.path('/FAQ');
  };

  // If there is a logged in user go to writestory otherwise go to login
  $scope.User = Login.user;

  $scope.goToCreateStory = function(){
    if (Login.user._id) {
      $location.path('/writeStory');
      console.log("Logged in, now you can write a story!");
    } else {
      $location.path('/login');
      console.log("Please login to write a story!");
    }
    
  };

}]);