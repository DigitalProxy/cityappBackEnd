//***EXPRESS SERVER BUILD***//

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const conn = require("../connection");

//One model per collection
const Buildings = require("../models/buildings-model");
const Streets = require("../models/streets-model");
const Surroundings = require("../models/surroundings-model");
const Users = require("../models/users-model");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

//Connection code
mongoose.connect(conn.atlasURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//Feedback to let us know we succeeded
mongoose.connection.on("connected", (err, res) => {
  console.log("Success! Connected to MongoDB");
});

//In case we fail
mongoose.connection.on("error", (err) => {
  console.log("Error connecting to MongoDB ", err);
});
// end connection code

//Base
app.get("/", function (req, res) {
  res.send("<h1>City App - Check One, Check Two</h1>");
});

//Api routes
// create new routes using api - good RESTful practice
const router = express.Router();
app.use("/api", router);

//***EXPRESS SERVER BUILD***//




