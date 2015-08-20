var config = require("../config.json");
var sha256 = require("sha256");

module.exports = function(mongoose){

  // Create a new mongoose schema 
  // with properties
  var UserSchema = mongoose.Schema({
    user_name: {type: String, unique: true, required: true},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    city: {type: String, required: true},
    country: {type: String, required: true},
    password: {type: String, required: true}
  });

  //Fixa så det blir ej dublett - gör namngiven funktion

  UserSchema.pre('save', function(next) {
    this.password = sha256(config.hashSalt + this.password);
    console.log("save");
    next();
  });

  UserSchema.pre('update', function(next) {
      console.log("update");
    if(this.password){
    }
      next();
  });

  // Create a model from the schema
  // give it the name "Person"
  var User = mongoose.model("User",UserSchema);

  // Return the model
  return User;

};
