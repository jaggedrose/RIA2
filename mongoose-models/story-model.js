module.exports = function(mongoose){

  // Create a new mongoose schema 
  // with properties
  var StorieSchema = mongoose.Schema({
    title: String,
    section1: {
      header: String,
      text: String,
      img: String
    },
     section2: {
      header: String,
      text: String,
      img: String
    },
    section3: {
      header: String,
      text: String,
      img: String
    },
    date_created: Date,
    date_modified: Date,
    number_views: Number,
    tags: String,
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  });

  // Create a model from the schema
  // give it the name "Person"
  var Storie = mongoose.model("Story",StorieSchema);

  // Return the model
  return Storie;

};
