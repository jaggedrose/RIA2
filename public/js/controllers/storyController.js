//"myAppName" controller
app.controller("storyController", ["$http", "$scope","$routeParams","$location", "Story", "Tag",
  function($http, $scope, $routeParams, $location, Story, Tag) {
  // Counter
  var sectionid = $routeParams.sectionid;
 
  // If we should load an existing story
  var id = $routeParams.id;
  if(id && id!="new"){
    // Get existing story from db
    $scope.storyData = Story.getById({"_id" : id, _populate: "tags"}, function(response){
      $scope.storyData = response;
      $scope.storySection =  $scope.storyData["section" + sectionid];
      $scope.tagNames = $scope.storyData.tags.map(function(tag){return tag.tagName}).join(", ");
    });
  }
  else {
    // Create a new story and save immediately to the db
    Story.create(
      {
        // we should add user_id here later!!!
        title:"",
        date_created: "",
        date_modified: "",
        tags:[],
        number_views: ""
      }, function(arrayOfNewStories){
        // As soon as we have a new story and its id
        // change url to reflect the story id
        $location.url("/writeStory/" + arrayOfNewStories[0]._id);
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

  // compose a 'nice' date
  function niceDate (date) {

    var nDate = new Date (date);
    nDate = nDate.toString();
    nDate = nDate.slice(0,21);

    return nDate;
    
  }


  // Change section
  $scope.onSectionForward = function(){
     var nextSection = sectionid/1 + 1;
     if(nextSection > 3){nextSection = 1;}
     $location.url('/writeStory/' + id + '/section/' + nextSection);
  };

  // Change section
  $scope.onSectionBack = function(){
     var nextSection = sectionid/1 - 1;
     if(nextSection < 1){nextSection = 3;}
     $location.url('/writeStory/' + id + '/section/' + nextSection);
  };

  // On location change try to save the story including updated section, tags etc
  $scope.$on('$locationChangeStart',function(){

    // Don't do anything if no storyData loaded 
    if(!$scope.storyData){return;}

    // Add the current section in the larger storyData object
    $scope.storyData["section" + sectionid] = $scope.storySection;

    // Handle tags (handle tags will eventually call saveStory)
    handleTags();

  });


  function handleTags(){

    // Read entered tags, remove whitespace, split on comma

    var tagArray = $scope.tagNames;
    tagArray = tagArray.replace(/,\s/g,',').split(","); 
    
    // Remove duplicate tags
    // ..use js filter!

    // Then GET them from db
    // The GET is on our 'cleaned and split tagArray, the callback takes the result
    // (as 'tags')

    Tag.get({tagName: {$in:tagArray}},function(tags){

      // tags is an array of objects. 'map' out only the tagName(s) to new array 
      // (existingTagNames)

      existingTagNames = tags.map(function(x){
        return x.tagName;
      });
      
      // find non-existing tagnames 

      nonExistingTagNames = tagArray.filter(function(aTagName){
        return aTagName && existingTagNames.indexOf(aTagName)<0;
      });

      console.log("Needs to be created",nonExistingTagNames);

      var tagObjectsToCreate = nonExistingTagNames.map(function(tagName){
        return {tagName: tagName};
      });

      // Save new tags to DB if needed 
      // .create does not like empty arrays - hence if/else

      if(tagObjectsToCreate.length > 0){
        Tag.create(tagObjectsToCreate,preSaveStory)
      }
      else {
        preSaveStory();
      };

      function preSaveStory(newTags){
        newTags = newTags || [];
        var allTags = tags.concat(newTags);
        saveStory(allTags);
      }

    });
  }
   
  function saveStory(allTags){

    // Add both new tag objects to the story
    $scope.storyData.tags =  allTags;

    // Save the story to DB
    Story.update({_id:$scope.storyData._id},$scope.storyData);

  }
 
  $scope.uploadImage = function(){
    console.log ("Hey! Image upload!");
      
  };
}]);
