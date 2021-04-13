const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const conn = require("./connection");

//One model per collection
const Buildings = require("./models/buildings-model");
const Streets = require("./models/streets-model");
const Surroundings = require("./models/surroundings-model");
const Users = require("./models/users-model");

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

router.get("/bss_username", (req, res) => {
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

router.get("/users", (req, res) => {
  Users.find({}).then(
    (usersArray) => {
      res.json(usersArray);
    },
    () => {
      res.json({ result: false });
    }
  );
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

/////***START CREATE POSTS***
    
    // CREATE new post (buildings)
    router.post("/buildings", (req, res) => { 
      console.log("add new building - endpoint called")
      // create instance writer model 
      var newbuilding = new Buildings(); 
      var reactForm = req.body; 
  
      // copy form data into instance. nice. 
      Object.assign(newbuilding, reactForm); 
  
      // for debug only 
      console.log(">>> ", reactForm); 
  
      newbuilding.save().then( 
      (result) => { 
          return res.json(result); 
      }, 
      () => { 
          return res.send("problem adding new building"); 
      } 
      ); 
  }); 
  // end CREATE new post (buildings)

  // CREATE new post (streets)
  router.post("/streets", (req, res) => { 
      console.log("add new street - endpoint called")
      // create instance writer model 
      var newstreet = new Streets(); 
      var reactForm = req.body; 
  
      // copy form data into instance. nice. 
      Object.assign(newstreet, reactForm); 
  
      // for debug only 
      console.log(">>> ", reactForm); 
  
      newstreet.save().then( 
      (result) => { 
          return res.json(result); 
      }, 
      () => { 
          return res.send("problem adding new street"); 
      } 
      ); 
  }); 
  // end CREATE new post (streets)

  // CREATE new post (surroundings)
  router.post("/surroundings", (req, res) => { 
      console.log("add new surrounding - endpoint called")
      // create instance writer model 
      var newsurrounding = new Surroundings(); 
      var reactForm = req.body; 
  
      // copy form data into instance. nice. 
      Object.assign(newsurrounding, reactForm); 
  
      // for debug only 
      console.log(">>> ", reactForm); 
  
      newsurrounding.save().then( 
      (result) => { 
          return res.json(result); 
      }, 
      () => { 
          return res.send("problem adding new surrounding"); 
      } 
      ); 
  }); 
  // end CREATE new post (surroundings)

/////***END CREATE POSTS***

//Catch bad endpoints on the api route only
router.get("/*", (req, res) => {
  return res.json({ result: "not a valid endpoint" });
});

//post user profile to DB
router.post("/users", (req, res) => { 
  console.log("add new user - endpoint called")
  // create instance users model 
  var newuser = new Users(); 
  var reactForm = req.body; 

  // copy form data into instance. nice. 
  Object.assign(newuser, reactForm); 

  // for debug only 
  console.log(">>> ", reactForm); 

  newuser.save().then( 
    (result) => { 
      return res.json(result); 
    }, 
    () => { 
      return res.send("problem adding new user"); 
    } 
  ); 
}); 

let PORT = 4000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
