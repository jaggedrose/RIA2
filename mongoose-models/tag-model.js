module.exports = function(mongoose) {

  // Mongoose schema for tag(s)
  var TagSchema = mongoose.Schema ({
    tagName: { type : String , unique : true, required : true },
    machineName: String
  });

  TagSchema.pre('save', function (next) {

    console.log("t", this);
    this.machineName = this.tagName
    .toLowerCase()        // make all characters lower case
    .replace(/\s/g,'_')   // replace all white spaces with _ 
    .replace(/[åä]/g,'a') // replace å and ä with a
    .replace(/ö/g,'o')    // replace ö with o
    .replace(/\W/g,"")    // remove everything but a-z,0-9,_
    .replace(/_/g,'-');   // replace _ with -
    // console.log ("machineName", machineName);
    next();
  });

  // create model from schema
  var Tag = mongoose.model("Tag", TagSchema);

  console.log("Tag schema");

  // return model
  return Tag;

};