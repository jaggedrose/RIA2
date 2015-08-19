//"myAppName" controller
app.controller("storyController", ["$http", "$scope","$routeParams","$location", "Story", "Tag", "Login", "FileUploader",
  function($http, $scope, $routeParams, $location, Story, Tag, Login, FileUploader) {
  // Counter
  var sectionid = $routeParams.sectionid;
 
  var storySectionCC = {
    sectionNo:1,
    header: "",
    text: "",
    img: "",
    date_created: "",
    date_modified: "",
    number_views: "",
  };

  // IF WE SHOULD LOAD AN EXISTING STORY
  var id = $routeParams.id;
  if(id && id!="new"){
    
    // GET EXISTING STORY FROM DB
    $scope.storyData = Story.getById({"_id" : id, _populate: "tags"}, function(response){

      // logged in?
      if(response.user_id != Login.user._id){
        
        // User_id of story does not match logged in user, so
        // do something
        if(!Login.user._id){
          // not logged in at all - goto login page?
        }
        else {
          // logged in as a different user - other error message?
        }
        alert("Something went wrong");
        $location.url("/");
        return;
      }

      $scope.storyData = response;
      $scope.storySection = $scope.storyData["section" + sectionid] ? $scope.storyData["section" + sectionid] : angular.copy(storySectionCC);
      $scope.tagNames = $scope.storyData.tags.map(function(tag){return tag.tagName}).join(", ");
    });
  }

  else {

    // CREATE A NEW STORY AND IMMIDIATELY SAVE TO DB

    // logged in?
    if(!Login.user._id){
      //goto "went wrong controller";
      alert("Something went wrong");
      $location.url("/");
      return;
    }

    Story.create(
      {
        user_id:Login.user._id,
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
    $scope.tagNames = '';
  }

  $scope.storySection = angular.copy(storySectionCC);

  // compose a 'nice' date
  function niceDate (date) {

    var nDate = new Date (date);
    nDate = nDate.toString().slice(0,21);
    return nDate;
    
  }
  
  //Check if a image is choosen, upload the image and return the image url
  $scope.$watch("files",function(){
    console.log("s", $scope);
    //console.log("s2", $scope.$parent);
    // If there is no file array or it has not length do nothing
    if(!$scope.files || $scope.files.length < 1){return;}
    // Otherwise upload the file properly
    FileUploader($scope.files[0]).success(function(imgurl) {
      $scope.storySection.img = imgurl;
      console.log("filnamn: ", $scope.files[0].name, "sökväg = ", $scope.storySection.img);
    });
  });


  // CHANGE SECTION
  $scope.onSectionForward = function(){
     var nextSection = sectionid/1 + 1;
     if(nextSection > 3){nextSection = 1;}
     $location.url('/writeStory/' + id + '/section/' + nextSection);
  };

  // CHANGE SECTION
  $scope.onSectionBack = function(){
     var nextSection = sectionid/1 - 1;
     if(nextSection < 1){nextSection = 3;}
     $location.url('/writeStory/' + id + '/section/' + nextSection);
  };

  // ON LOCATION CHANGE try to save the story including updated section, tags etc
  $scope.$on('$locationChangeStart',function(){

    // Don't do anything if no storyData loaded 
    if(!$scope.storyData){return;}

    // Add the current section in the larger storyData object
    $scope.storyData["section" + sectionid] = $scope.storySection;

    // Handle tags (handle tags will eventually call saveStory)
    handleTags();

  });

  // TAGS!

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
        Tag.create(tagObjectsToCreate,preSaveStory);
      }
      else {
        preSaveStory();
      }
      function preSaveStory(newTags){
        newTags = newTags || [];
        var allTags = tags.concat(newTags);
        saveStory(allTags);
      }

    });
  }
   
  function saveStory(allTags){

    // Add both new tag objects to the story
    $scope.storyData.tags = allTags;
    // Save the story to DB
    Story.update({_id:$scope.storyData._id},$scope.storyData);

  }
/*
//Function will check if there is a file choosen and then sent it to server folder uploads
//then send the image url to the db
  function uploadImage(){
    $scope.$watch("files",function(){
    // If there is no file array or it has not length do nothing
    if(!$scope.files || $scope.files.length < 1){return;}
    // Otherwise upload the file properly
    FileUploader($scope.files[0]).success(function(imgurl) {
    $scope.imgurl = storySection.img;
    console.log("filnamn: ", $scope.files[0].name, "sökväg = ", storySection.img);
  });
});
}
*/
/*
  $scope.uploadImage = function(){
    console.log ("Hey! Image upload!");
      
  };
*/
}]);
