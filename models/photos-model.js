const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PhotosSchema = new Schema(
  {
    title: {type: String,required:true},
    name: String,
    email: String,
    type_id: String,
    filepath: String,
  },
  
  {
    timestamps: true,
    //modfied date
  }
);

// singular capitalized name for the mongo collection - Photo
module.exports = mongoose.model("Photo", PhotosSchema);

