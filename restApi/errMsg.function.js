// function for generating error messages
function errMsg(msg) {
  return {"error": msg ? msg : "Route not found."};
}



// export our function for require()
module.exports = errMsg;