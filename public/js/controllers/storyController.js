//"myAppName" controller
app.controller("storyController", ["$http", "$scope","$routeParams","$location", "Story", "Tag", "Login", "FileUploader", "$modal", "$timeout", "UserStore",
  function($http, $scope, $routeParams, $location, Story, Tag, Login, FileUploader, $modal, $timeout, UserStore) {
  $scope.$broadcast("cropme:open");
  $scope.croppingNotDone = true;

  // track which section we are on
  var sectionid = $routeParams.sectionid;
 
  var storySectionCC = {
    sectionNo: sectionid,
    text: "",
    header: "",
    img: "",
    date_created: "",
    date_modified: "",
    number_views: ""
  };


  $scope.textLength = function() {
    if (
      $scope.storyForm &&
      $scope.storyForm.sectionText &&
      $scope.storyForm.sectionText.$$lastCommittedViewValue
    ) {

      return $scope.storyForm.sectionText.$$lastCommittedViewValue.length;
    }
    return 0;
  };


  // IF WE SHOULD LOAD AN EXISTING STORY
  var id = $routeParams.id;
  if(id && id!="new"){
    // An existing story has images.. hide cropMe.
    // $scope.croppingNotDone = false;


    // GET EXISTING STORY FROM DB
    $scope.storyData = Story.getById({"_id" : id, _populate: "tags"}, function(response){
      console.log("storyData: ", $scope.storyData);
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
      $scope.niceDate = niceDate($scope.storyData.date_created);
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
        if (!UserStore.tmp.stories) {
          UserStore.tmp.stories = {};
        }
        UserStore.tmp.stories[arrayOfNewStories[0]._id] = true;
        $location.url("/writeStory/" + arrayOfNewStories[0]._id);
      }
    );
    // DON'T DO ANYTHING ELSE INSIDE THIS ELSE
    // REDIRECT IS UNDERWAY
  }

  // END OF LOADING THE STORY
  window.scope = $scope;

  // Check if active - set CSS .navthumbcurrent
  $scope.activeClass = function(section){
    if(section == sectionid){return "navthumbcurrent";}
  };

  // compose a 'nice' date
  function niceDate (date) {

    var nDate = new Date (date);
    nDate = nDate.toString().slice(0,21);
    return nDate;
    
  }
   
  // Check if an image is choosen, upload the image and return the image url
  $scope.$watch("file",function(){
    // If there is no file array or it has no length do nothing
    if(!$scope.file || $scope.file.length < 1){return;}
    // Otherwise upload the file properly
    FileUploader($scope.file).success(function(imgurl) {
      console.log("file: ", $scope.file);
      $scope.hide = false;
      // Set the image url to the greater storySection object
      $scope.storySection.img = imgurl;
      // Handle validation
      $scope.storyForm.sectionFile.$setValidity("required", true);
      
      console.log("storySection: ", $scope.storySection);
      
    });
  });

  // function to show a section's saved image OR a section's currently loaded but not saved image 

  function updateCropMeSize(){
    var w = window.innerWidth - 30*2;
    $scope.cropme = {width:w,height:w*0.75};
    if(!$scope.$$phase){
      $scope.$apply();
    }
    //console.log("updating crop me size",w);
  }
  updateCropMeSize();
  window.addEventListener("resize",updateCropMeSize);

  $scope.showImg = function(currSec) {
    var img = '';
    if (
      $scope.storyData &&
      $scope.storyData['section' + currSec] &&
      $scope.storyData['section' + currSec].img // &&
      // currSec != sectionid
    ) {
      img = $scope.storyData['section' + currSec].img;
      currSec == sectionid && ($scope.croppingNotDone = false);
    } else if (
      $scope.storySection &&
      $scope.storySection.img &&
      $scope.storySection.sectionNo == currSec
    ) {
      img = $scope.storySection.img;
      currSec == sectionid && ($scope.croppingNotDone = false);
    } else {
      
    }
    return img;
  };

  // CHANGE SECTION - Forward
  $scope.onSectionForward = function(){
    
    $scope.moved = true;

    // Validation for the sectionFile field, *in case we are editing an existing story/section*.
    // The *ng-model* of the sectionFile input is set to 'file' in order to feed ng-file-upload,
    // and won't do for validating. Hence, we test .img on the storySection object.
    
    if ($scope.storySection.img) {
      
      // We got an image. Set the field to valid..
      //$scope.storyForm.sectionFile.$setValidity("required", true);
      
      // bugfix for duplicate "lost" sectionFile field created by
      // ngf-select directive.
      if ($scope.storyForm.$error.required) {
        $scope.storyForm.$error.required.forEach(function(vErr) {
          if (vErr.$name === $scope.storyForm.sectionFile.$name) {
            vErr.$setValidity("required", true);
          }
        });
      }
    }

    if ($scope.storyForm.$valid) {
      console.log ("Form valid!", $scope.storyForm.$valid);
      var nextSection = sectionid/1 + 1;
      if(nextSection > 3){nextSection = 1;}
      $location.url('/writeStory/' + id + '/section/' + nextSection);
      $scope.moved = false;
    }
    else {
      console.log ("storyForm.$valid: ", $scope.storyForm.$valid);
      return;
    }
  };

  // CHANGE SECTION - Backwards
  $scope.onSectionBack = function(){
    $scope.moved = true;

    if ($scope.storySection.img) {
      
      // We got an image. Set the field to valid..
      //$scope.storyForm.sectionFile.$setValidity("required", true);
      
      // bugfix for duplicate "lost" sectionFile field created by
      // ngf-select directive.
      if ($scope.storyForm.$error.required) {
        $scope.storyForm.$error.required.forEach(function(vErr) {
          if (vErr.$name === $scope.storyForm.sectionFile.$name) {
            vErr.$setValidity("required", true);
          }
        });
      }
    }

    if ($scope.storyForm.$valid) {
      console.log ("Form valid! backwards..", $scope.storyForm.$valid);
      var nextSection = sectionid/1 - 1;
      if(nextSection < 1){nextSection = 3;}
      $location.url('/writeStory/' + id + '/section/' + nextSection);
      $scope.moved = false;
    }
    else {
      console.log ("backward motherFucker! valid: ", $scope.storyForm.$valid);
      return;
    }
  };


  // ON LOCATION CHANGE try to save the story including updated section, tags etc
  $scope.$on('$locationChangeStart',function(event, next, current){
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
    // ..use js filter! - dev suspended

    // Then GET them from db
    // The GET is on our 'cleaned' and split tagArray, the callback takes the result
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
    if (UserStore.tmp.stories && UserStore.tmp.stories[$scope.storyData._id]) {
      delete UserStore.tmp.stories[$scope.storyData._id];
    }
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

  $scope.$on("cropme:loaded", function(ev, width, height) {
    $scope.storyForm.sectionFile.$setDirty();
    console.log("$scope.storyForm.sectionFile", $scope.storyForm.sectionFile);
    $scope.cropped = false;
    console.log("cropme:loaded");
  });

  //When user presses "Crop"-button
  $scope.$on("cropme:done", function(ev, result, canvasEl) {
    var pseudoFile = result.croppedImage;
    pseudoFile.name = result.filename;
    //FileUploader(pseudoFile).success(function(imgurl) {
      //$scope.storySection.img = imgurl;
    //});
    console.log("Pseudofile: ", pseudoFile);
    $scope.file = pseudoFile;
    $scope.croppingNotDone = false;
  });


  //Control modal for deleting image
 window.theScope = $scope;
  $scope.openModal = function(size,imgName ) {
    imgName = imgName || $scope.file.name;
    console.log("openModal !!!", imgName);
    var modalInstance = $modal.open({
      templateUrl: 'partials/deleteImgModal.html',
      controller: 'deleteImgController',
      scope: $scope,
      size: size,
      resolve: {
        imgUrl: function () {
          return imgName;
          
        }
      }
    });

    modalInstance.result.then(function() {
      // If user choose "Yes"-button
      $http.post('/api/removeImage', {imgsrc: $scope.storySection.img}).success(function() {
        $scope.storySection.img = "";
        $scope.croppingNotDone = true;
        //console.log("You choosed Yes-button", "Bildfil =",$scope.storySection.img);
      });
       
    }, function () {
      // If user choose "No"-button
      //console.log("You choosed No-button");
    });
  };
}]);

