module.exports = function(mongoose){

  // Create a new mongoose schema 
  // with properties
  var PersonSchema = mongoose.Schema({
    name: String,
    towelColor: String,
    age:Number
  });

  // Create a model from the schema
  // give it the name "Person"
  var Person = mongoose.model("Person",PersonSchema);

  // Return the model
  return Person;

};
