//Factory for using local storage
app.factory("UserStore", [function() {
  if (!localStorage.stories) {
    localStorage.stories = {};
  }

  return {
    tmp: {},
    perm: localStorage.stories
  };
}]);

