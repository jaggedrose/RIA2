app.directive('center',function(){
  return {
    link:function(scope,el,attrs,ngModel){
      // console.log("center els", el, attrs, attrs.$$element[0].offsetWidth);
      // jQuery is now called angular.element()
      var widthOfAPic = 93;
      el.css({
        // when "DOM ready"
        width: 3*widthOfAPic + "px"
      });
      window.addEventListener('resize', function(event){
        // console.log("wndw resize");
        // do stuff here
      });
    }
  };
});