//"myAppName" controller.
app.controller("ViewStoryController", ["$http", "$scope", "$location", "Story","User","$routeParams", function($http, $scope, $location, Story, User, $routeParams) {
  var id = $routeParams.id;
  var sectionid = $routeParams.sectionid;
  

  // Load the current story
  $scope.aStory = Story.getById({_id: id, _populate:"user_id"}, function(){
    
    // Load the current section
    $scope.storySection =  $scope.aStory["section" + sectionid];
    
  });

  // Check if active - set CSS .navthumbcurrent
  $scope.activeClass = function(section){
    if(section == sectionid){return "navthumbcurrent";}
  };

}]);

