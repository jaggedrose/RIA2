app.directive('center',function(){
  return {
    link:function(scope,el,attrs,ngModel){
      // jQuery is now called angular.element()
      var widthOfAPic = 93;
      el.css({
        // when "DOM ready"
        width: 3*widthOfAPic + "px"
      });
      window.addEventListener('resize', function(event){
        // do stuff here
      });
    }
  };
});