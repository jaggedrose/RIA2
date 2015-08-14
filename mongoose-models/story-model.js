module.exports = function(mongoose){

  // Create a new mongoose schema 
  // with properties
  var StorySchema = mongoose.Schema({
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
    tags: [{type:mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  });

  StorySchema.pre('save', function(next) {
    now = new Date();
    this.date_modified = now;
    if ( !this.date_created ) {
      this.date_created = now;
    }
    next();
  });

  // Create a model from the schema
  
  var Story = mongoose.model("Story",StorySchema);

  // Return the model
  return Story;

};
