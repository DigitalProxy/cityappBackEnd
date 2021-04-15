const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var StreetsSchema = new Schema(
  {
    username: String,
    title: String,
    name: String,
    email: String,
    type_id: String,
    filepath: String,
    comment: String,
  },
  
  {
    timestamps: true,
    //modfied date
  }
);

// singular capitalized name for the mongo collection - Street
module.exports = mongoose.model("Street", StreetsSchema);