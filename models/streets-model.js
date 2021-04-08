const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var StreetsSchema = new Schema(
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

// singular capitalized name for the mongo collection - Street
module.exports = mongoose.model("Street", StreetsSchema);