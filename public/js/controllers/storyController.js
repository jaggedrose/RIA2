//"myAppName" controller.
console.log("hej");
app.controller("storyController", ["$http", "$scope", "Story", function($http, $scope, Story) {



  // Create a new story and save immediately to the db
  window.a = $scope.myStory = Story.create({title:"Untitled"});

  // A representation of the currently edited section
  $scope.storySection = {sectionNo:1, header: "", text: "", image: ""};

  // On section change
  function onSectionForward(back){
    // Add the current section in the larger myStory object
    $scope.myStory["section" + $scope.storySection.sectionNo] = $scope.storySection;
    // Save to DB
    Story.update({_id:$scope.myStory._id},$scope.myStory);
    // Don't do anything else if we are the last section
    if(
      ($scope.storySection.sectionNo >= 3 && !back) ||
      ($scope.storySection.sectionNo <= 1 && back)
    ){return;}
    // Increment section number
    $scope.storySection.sectionNo += (back ? -1 : 1);
    // Now change to what is stored for this section in myStory
    $scope.storySection =  $scope.myStory["section" + $scope.storySection.sectionNo];
  }

  function onSectionBack(){
    onSectionForward(true);
  }

}]);

