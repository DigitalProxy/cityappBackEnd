const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BuildingsSchema = new Schema(
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

// singular capitalized name for the mongo collection - Photo
module.exports = mongoose.model("Building", BuildingsSchema);

//REVISED SCHEMA
//title
//username
//location //within CHCH i.e. dropdown menu
//device   //radio or dropdown camera/mobile/tablet
//category //buidlings/streets/surroundings
