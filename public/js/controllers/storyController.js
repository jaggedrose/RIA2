//"myAppName" controller
app.controller("storyController", ["$http", "$scope", "Story","$routeParams","$location",
  function($http, $scope, Story, $routeParams, $location) {
  // Counter
  var sectionid = $routeParams.sectionid;
 
  // If we should load an existing story
  var id = $routeParams.id;
  if(id && id!="new"){
    // Get existing story from db
    $scope.storyData = Story.getById({"_id" : id}, function(response){
      console.log('response ',response);
      $scope.storyData = response;
      $scope.storySection =  $scope.storyData["section" + sectionid];
      
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

  $scope.$on('$locationChangeStart',function(){
    // Add the current section in the larger storyData object
    $scope.storyData["section" + sectionid] = $scope.storySection;

    // Save to DB
    Story.update({_id:$scope.storyData._id},$scope.storyData);
  });
   
 
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
