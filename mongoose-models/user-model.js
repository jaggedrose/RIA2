module.exports = function(mongoose){

  var config = require("../config.json");
  var sha256 = require("sha256");

  // Create a new mongoose schema 
  // with properties
  var UserSchema = mongoose.Schema({
    user_name: {type: String, unique: true},
    first_name: String,
    last_name: String,
    email: {type: String, unique: true},
    city: String,
    country: String,
    password: String
  });

  UserSchema.pre('save', function(next) {
    this.password = sha256(config.hashSalt + this.password);
    next();
  });

  // Create a model from the schema
  // give it the name "Person"
  var User = mongoose.model("User",UserSchema);

  // Return the model
  return User;

};
