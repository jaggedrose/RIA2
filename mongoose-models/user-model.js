module.exports = function(mongoose){

  // Create a new mongoose schema 
  // with properties
  var UserSchema = mongoose.Schema({
    user_name: String,
    first_name: String,
    last_name: String,
    email: String,
    stad: String,
    land: String,
    password: String
  });

  // Create a model from the schema
  // give it the name "Person"
  var User = mongoose.model("User",UserSchema);

  // Return the model
  return User;

};