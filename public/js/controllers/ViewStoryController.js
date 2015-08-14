//"myAppName" controller.
app.controller("ViewStoryController", ["$http", "$scope", "$location", "Story","User","$routeParams", function($http, $scope, $location, Story, User, $routeParams) {
  var id = $routeParams.id;
  var sectionid = $routeParams.sectionid;
  var currentSection = 1;

  // Load the current story
  $scope.aStory = Story.getById({_id: id, _populate:"user_id"}, function(){
    console.log($scope.aStory);
    // Load the current section
    $scope.storySection =  $scope.aStory["section" + sectionid];
  });

  // Change section
  $scope.onSectionForward = function(){
     var nextSection = sectionid/1 + 1;
     if(nextSection > 3){nextSection = 1;}
     $location.url('/viewStory/' + id + '/section/' + nextSection);
  };

  // Change section
  $scope.onSectionBack = function(){
     var nextSection = sectionid/1 - 1;
     if(nextSection < 1){nextSection = 3;}
     $location.url('/viewStory/' + id + '/section/' + nextSection);
  };

}]);

