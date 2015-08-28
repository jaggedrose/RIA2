app.factory("UserStore", [function() {
  if (!localStorage.stories) {
    localStorage.stories = {};
  }

  return {
    tmp: {},
    perm: localStorage.stories
  }
}])

// Hugo example factory for using local storage (to store drafts etc)