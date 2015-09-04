//"myAppName" controller.
app.controller("ViewStoryController", ["$http", "$scope", "$location", "$routeParams", "Story", "User", function($http, $scope, $location,  $routeParams, Story, User) {
  var id = $routeParams.id;
  var sectionid = $routeParams.sectionid;

  // Load the current story
  $scope.aStory = Story.getById({_id: id, _populate:"user_id tags"}, function(){
    
    // Load the current section
    $scope.storySection =  $scope.aStory["section" + sectionid];
    console.log ("aStory: ", $scope.aStory);
    
  });

  // Check if active - set CSS .navthumbcurrent
  $scope.activeClass = function(section){
    if(section == sectionid){return "navthumbcurrent";}
  };

  // Change section

  $scope.onSectionForward = function(){
    
    $scope.moved = true;

      var nextSection = sectionid/1 + 1;
      if(nextSection > 3){nextSection = 1;}
      $location.url('/viewStory/' + id + '/section/' + nextSection);
      $scope.moved = false;
  };

}]);

