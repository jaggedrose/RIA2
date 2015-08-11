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
    date_created: {type: Date },
    date_modified: {type: Date},

    number_views: Number,
    tags: String,
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  });

  StorieSchema.pre('save', function(next) {
    now = new Date();
    this.date_modified = now;
    if ( !this.date_created ) {
      this.date_created = now;
    }
    next();
  })

  // Create a model from the schema
  
  var Storie = mongoose.model("Story",StorieSchema);

  // Return the model
  return Storie;

};
