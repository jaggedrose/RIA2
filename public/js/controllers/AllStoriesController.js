app.controller("AllStoriesController", ["$http", "$scope", "Story","$routeParams","$location", 
  function($http, $scope, Story, $routeParams, $location) {

		$scope.AllStories = Story.get(function(){
				console.log(" AllStories");
		});
}]);