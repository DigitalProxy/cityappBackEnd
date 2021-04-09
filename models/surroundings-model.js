const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SurroundingsSchema = new Schema(
  {
    id: String,
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

// singular capitalized name for the mongo collection - Surrounding
module.exports = mongoose.model("Surrounding", SurroundingsSchema);