//"myAppName" controller.
app.controller("StoryController", ["$http", "$scope", "Story", function($http, $scope, Story) {
  $scope.storysection = 1;   
  $scope.storyData = New Story();
  
  // form title, pic, head, text (+n)

  form = {
    title: title,
    pic: pic+[storysection],
    header: header+[storysection],
    text: text+[storysection]
  }

  // $scope.submit();

  $scope.submit = function (){
    $scope.storyData.$save(sectionsaved);
    function sectionsaved (){
      $scope.storysection++;
      if ($scope.storysection > 3) {
        console.log ("user done! storysection = ", $scope.storysection);
      }
    }
  }

  
    });
  };
}]);

