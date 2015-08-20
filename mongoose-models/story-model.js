module.exports = function(mongoose){

  // Create a new mongoose schema 
  // with properties
  var StorySchema = mongoose.Schema({
    title: {type: String, required: true},
    section1: {
      header: {type: String, required: true},
      text: {type: String, required: true},
      img: {type: String, required: true}
    },
    section2: {
      header: {type: String, required: true},
      text: {type: String, required: true},
      img: {type: String, required: true}
    },
    section3: {
      header: {type: String, required: true},
      text: {type: String, required: true},
      img: {type: String, required: true}
    },
    date_created: {type: Date, required: true},
    date_modified: {type: Date, required: true},
    number_views: Number,
    tags: [{type:mongoose.Schema.Types.ObjectId, ref: 'Tag', required: true}],
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
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
