//"myAppName" controller
app.controller("storyController", ["$http", "$scope", "Story", "Tag", "$routeParams","$location",
  function($http, $scope, Story, Tag, $routeParams, $location) {
  // Counter
  var currentSection = 1;

  // If we should load an existing story
  var id = $routeParams.id;
  if(id){
    // Get existing story from db
    $scope.storyData = Story.getById({"_id" : id, _populate: "tags"}, function(response){
      console.log('response ',response);
      $scope.storyData = response;
      $scope.storySection =  $scope.storyData["section1"];
      $scope.tagNames = $scope.storyData.tags.map(function(tag){return tag.tagName}).join(", ");
    });
  }
  else {
    // Create a new story and save immediately to the db
    Story.create(
      {
        title:"",
        date_created: "",
        date_modified: "",
        tags: [],
        number_views: ""
      }, function(arrayOfNewStories){
        $scope.storyData = arrayOfNewStories[0];
        $scope.tagNames = $scope.storyData.tags.map(function(tag){return tag.tagName}).join(", ");
        console.log ("created new story");
        $scope.storyData.niceDate = niceDate ($scope.storyData.date_created);
        console.log ("$scope.storyData post created story: ", $scope.storyData);
      }
    );
  }

  $scope.storySection = {
    sectionNo:1, 
    header: "", 
    text: "",
    img: "",
    date_created: "",
    date_modified: "",
    number_views: "",

  };

  // compose a 'nice' date for UI 
  function niceDate (date) {

    var nDate = new Date (date);
    nDate = nDate.toString().slice(0,21);
    return nDate;
  };
   
  // On section change
  $scope.onSectionForward = function(back){

    // Sort out tags. Store entered tags and strip whitespace, split them on ','

    var tagArray = $scope.tagNames;
    tagArray = tagArray.replace(/,\s/g,',').split(","); 
      console.log("tagArray",tagArray);


    // Remove tags from $scope.storyData.tags according to current content in tagArray

    // ..filter!

    // Then GET them from db

    Tag.get({tagName: {$in:tagArray}},function(tags){

      // tags is an array of objects. 'map' out tagName(s) to new array 

      existingTagNames = tags.map(function(x){
        return x.tagName;
      });
      
      // find non-existing tagnames by filter andto user-entered

      nonExistingTagNames = tagArray.filter(function(aTagName){
        return existingTagNames.indexOf(aTagName)<0;
      });

      console.log("Needs to be created",nonExistingTagNames);


      var tagObjectsToCreate = nonExistingTagNames.map(function(tagName){
        return {tagName: tagName};
      });

      // Save new tags to DB if needed (.create does not like empty arrays)
     if(tagObjectsToCreate.length > 0){
        Tag.create(tagObjectsToCreate,saveStory)
     }
     else {
        saveStory();
     };

    });


    function saveStory(newTags){

      // Add both new tag objects to the story
      $scope.storyData.tags =  $scope.storyData.tags.concat(newTags || []);

      // Add the current section in the larger storyData object
      $scope.storyData["section" + currentSection] = $scope.storySection;

      // Save the story to DB
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

    }

   
  }; 
    
  $scope.onSectionBack = function(){
    $scope.onSectionForward(true);
  };

  $scope.uploadImage = function(){
    console.log ("Hey! Image upload!");
    
    
  };
}]);
