//"myAppName" controller.

app.controller("storyController", ["$http", "$scope", "Story", function($http, $scope, Story) {



  // Create a new story and save immediately to the db
  Story.create({title:"Untitled"},function(arrayOfNewStories){
    $scope.storyData = arrayOfNewStories[0];
  });
  // Counter
  var currentSection = 1;

  // A representation of the currently edited section
  $scope.storySection = {sectionNo:1, header: "", text: "", img: ""};
    console.log($scope.storySection);
  // On section change
  $scope.onSectionForward = function(back){
    console.log($scope);
    // Add the current section in the larger myStory object
    $scope.storyData["section" + currentSection] = $scope.storySection;
    // Save to DB
    Story.update({_id:$scope.storyData._id},$scope.storyData);
    // Don't do anything else if we are the last section
    if(
      (currentSection >= 3 && !back) ||
      (currentSection <= 1 && back)
    ){return;}
    // Increment section number
    currentSection += (back ? -1 : 1);
    // Now change to what is stored for this section in myStory
    $scope.storySection =  $scope.storyData["section" + currentSection] || {};
  }

  $scope.onSectionBack = function(){
    onSectionForward(true);
  }

}]);

