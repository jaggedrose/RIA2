//"myAppName" controller

app.controller("storyController", ["$http", "$scope", "Story", "Tag", "FileUploader", "$routeParams","$location",
  function($http, $scope, Story, Tag, FileUploader, $routeParams, $location) {
  // Counter
  var currentSection = 1;

  // If we should load an existing story
  var id = $routeParams.id;
  if(id){
    // Get existing story from db
    $scope.storyData = Story.getById({"_id" : id}, function(response){
      console.log('response ',response);
      $scope.storyData = response;
      $scope.storySection =  $scope.storyData["section1"];
      
    });
  }
  else {
    // Create a new story and save immediately to the db
    Story.create(
      {
        title:"",
        date_created: "",
        date_modified: "",
        tags:"",
        number_views: ""
      }, function(arrayOfNewStories){
        $scope.storyData = arrayOfNewStories[0];
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

  // compose a 'nice' date
  function niceDate (date) {

    var nDate = new Date (date);
    nDate = nDate.toString().slice(0,21);
    return nDate;
    
  }


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
