//File upload form controller.

app.controller("fileUploadController", ["FileUploader", "$scope", function(FileUploader, $scope) {


	/*$scope.upload = function(files) {
//If a image file is loaded this if-statement checks the temporary url
	if (files && files.length>0) {
        var file = files[0];
        var URL = window.URL || window.webkitURL;
        var srcTmp = URL.createObjectURL(file);
        var img = new Image();
        img.src = srcTmp;
        console.log("img-name: ", files[0].name, "img-temp-url = ", img.src);
}
console.log("Upload function is running");
};*/
//This is moved to storyController
/*
$scope.$watch("files",function(){
  // If there is no file array or it has not length do nothing
  if(!$scope.files || $scope.files.length < 1){return;}
  // Otherwise upload the file properly
  FileUploader($scope.files[0]).success(function(imgurl) {
    $scope.imgurl = storySection.img;
    console.log("filnamn: ", $scope.files[0].name, "sökväg = ", storySection.img);
  });
});

*/


}]);