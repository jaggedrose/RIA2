//"myAppName" controller.

app.controller("storyController", ["$http", "$scope", "Story", "Tag", function($http, $scope, Story, Tag) {

  // Create a new story and save immediately to the db

  Story.create({title:"", date_created: "", date_modified: "", tags:[], number_views: ""},function(arrayOfNewStories){
    $scope.storyData = arrayOfNewStories[0];
    console.log ("created new story");
    $scope.storyData.niceDate = niceDate ($scope.storyData.date_created);
    console.log ("$scope.storyData post created story: ", $scope.storyData);

  });

  // Counter
  var currentSection = 1;

  // A representation of the currently edited section
  $scope.storySection = {
    sectionNo:1,
    header: "",
    text: "",
    img: "",
    date_created: "",
    date_modified: "",
    number_views: "",

  };

  // compose a 'nice' date
  function niceDate (date) {

    var nDate = new Date (date);
    nDate = nDate.toString().slice(0,21);
    return nDate;
    
  }
    
  // On section change
  $scope.onSectionForward = function(back){
    
    console.log ("$scope.storySection: ",$scope.storySection);

    // Add the current section in the larger storyData object
    $scope.storyData["section" + currentSection] = $scope.storySection;

    // Save to DB
    Story.update({_id:$scope.storyData._id},$scope.storyData);

    // Don't do anything else if we are in the last section
    if(
      (currentSection >= 3 && !back) ||
      (currentSection <= 1 && back)
    ){return;}
    
    // Increment section number
    currentSection += (back ? -1 : 1);
    console.log ("currentSection - post inc/dec: ", currentSection);
    
    // Now change to what is stored for this section in myStory
    $scope.storySection =  $scope.storyData["section" + currentSection] || {};
  };

  $scope.onSectionBack = function(){
    $scope.onSectionForward(true);
  };

  $scope.uploadImage = function(){
    console.log ("Hey! Image upload!");
    console.log ("storyData: ", $scope.storyData);

    Tag.get({},function(tags){
      console.log ("Tag.get: ", tags);
    });

    Tag.get({tagName: {$in:["det", "vet", "get"]}},function(tags){
      console.log ("Tag.get({tagName:array}: ", tags);
    });
    
  };

}]);

