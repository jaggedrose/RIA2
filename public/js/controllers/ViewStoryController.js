//"myAppName" controller.
app.controller("ViewStoryController", ["$http", "$scope", "Story","User","$routeParams", function($http, $scope, Story, User, $routeParams) {
  var id = $routeParams.id;
  var currentSection = 1;
// console.log(id);
  $scope.aStory = Story.getById({_id: id, _populate:"user_id"}, function(){
    console.log($scope.aStory);
    $scope.storySection =  $scope.aStory["section1"];
  });

 $scope.onSectionForward = function(back){

    // Add the current section in the larger storyData object
    $scope.aStory["section" + currentSection] = $scope.storySection;

       // Don't do anything else if we are in the last section
    if(
      (currentSection >= 3 && !back) ||
      (currentSection <= 1 && back)
    ){return;}
  
    // Increment section number
    currentSection += (back ? -1 : 1);
    
    console.log ("currentSection - post inc/dec: ", currentSection);
    
    // Now change to what is stored for this section in myStory
    $scope.storySection =  $scope.aStory["section" + currentSection] || {};
  }

  $scope.onSectionBack = function(){
    $scope.onSectionForward(true);
  }

}]);

