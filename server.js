const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const conn = require("./connection");

//One model per collection
const Buildings = require("./models/buildings-model");
const Streets = require("./models/streets-model");
const Surroundings = require("./models/surroundings-model");
// const Users = require("./models/users-model");

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


//Get Buildings,Streets and Settings
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

router.get("/bss", (req, res) => {
  var promises = [];
  promises.push(Buildings.find({}).lean());
  promises.push(Streets.find({}).lean());
  promises.push(Surroundings.find({}).lean());

  Promise.all(promises)
    .then((results) => {
      // merge using rest operator - very new
      var combinedArray = [...results[0], ...results[1], ...results[2]];
      shuffle(combinedArray);
      res.json({ result: combinedArray });
    })
    .catch((err) => {
      res.json({ result: false });
    });
});

router.get("/buildings", (req, res) => {
  Buildings.find().then(
    (buildingsArray) => {
      res.json(buildingsArray);
    },
    () => {
      res.json({ result: false });
    }
  );
});


//Get all streets
router.get("/streets", (req, res) => {
  Streets.find().then(
    (streetsArray) => {
      res.json(streetsArray);
    },
    () => {
      res.json({ result: false });
    }
  );
});

//Get all surroundings
router.get("/surroundings", (req, res) => {
  Surroundings.find().then(
    (surroundingsArray) => {
      res.json(surroundingsArray);
    },
    () => {
      res.json({ result: false });
    }
  );
});

//Catch bad endpoints on the api route only
router.get("/*", (req, res) => {
  return res.json({ result: "not a valid endpoint" });
});

let PORT = 4000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
