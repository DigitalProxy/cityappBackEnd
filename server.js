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
// example url to call this route:
//localhost:4000/api/bss_username/Knox%20Church/
router.get("/bss_username/:term", (req, res) => {
  var promises = [];
  console.log(">>>>>>> ", req.params.term);

  promises.push(Buildings.find({ title: req.params.term }).limit(1).lean());
  promises.push(Streets.find({ title: req.params.term }).limit(1).lean());
  promises.push(Surroundings.find({ title: req.params.term }).limit(1).lean());
  promises.push(Users.find({ title: req.params.term }).limit(1).lean());

  Promise.all(promises)
    .then((results) => {
      // merge using rest operator - very new
      var combinedArray = [
        ...results[0],
        ...results[1],
        ...results[2],
        ...results[3],
      ];
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

router.get("/buildings/:_id", (req, res) => { 
  console.table(req.params); 
  Buildings.findOne({ _id: req.params._id }, function (err, result) { 
  if (err) { 
      res.send(err); 
  } else { 
      res.send(result); 
  } 
  }); 
}); 

router.get("/streets/:_id", (req, res) => { 
  console.table(req.params); 
  Streets.findOne({ _id: req.params._id }, function (err, result) { 
  if (err) { 
      res.send(err); 
  } else { 
      res.send(result); 
  } 
  }); 
}); 

router.get("/surroundings/:_id", (req, res) => { 
  console.table(req.params); 
  Surroundings.findOne({ _id: req.params._id }, function (err, result) { 
  if (err) { 
      res.send(err); 
  } else { 
      res.send(result); 
  } 
  }); 
}); 


//start DELETE
router.delete("/buildings/:_id", (req, res) => { 
  console.table(req.params); 
  Buildings.deleteOne({ _id: req.params._id }, function (err, result) { 
  if (err) { 
      res.send(err); 
  } else { 
      res.send(result); 
  } 
  }); 
}); 

router.delete("/streets/:_id", (req, res) => { 
  console.table(req.params); 
  Streets.deleteOne({ _id: req.params._id }, function (err, result) { 
  if (err) { 
      res.send(err); 
  } else { 
      res.send(result); 
  } 
  }); 
}); 

router.delete("/surroundings/:_id", (req, res) => { 
  console.table(req.params); 
  Surroundings.deleteOne({ _id: req.params._id }, function (err, result) { 
  if (err) { 
      res.send(err); 
  } else { 
      res.send(result); 
  } 
  }); 
}); 
//end DELETE

/////***START CREATE POSTS***

// CREATE new post (buildings)
router.post("/buildings", (req, res) => {
  console.log("add new building - endpoint called");
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
  console.log("add new street - endpoint called");
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
  console.log("add new surrounding - endpoint called");
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

////**start PUT POSTS***
 // UPDATE buildings by id
 router.put("/buildings/:_id", (req, res) => { 
  console.log("hey buildings")
      Buildings.findOne({ _id: req.params._id }, function (err, objFromMongoDB) { 
      if (err) 
          return res.json({ 
          result: false, 
          }); 
  
      var data = req.body; 
  
      if (objFromMongoDB === null) { 
          return res.json({ 
          result: false, 
          }); 
      } 
      Object.assign(objFromMongoDB, data); 
      objFromMongoDB.save().then( 
          (response) => { 
          res.json({ 
              result: response, 
          }); 
          }, 
          (error) => { 
          res.json({ 
              result: false, 
          }); 
          } 
      ); 
      }); 
  }); 
  // end UPDATE buildings by id


// UPDATE surroundings by id
router.put("/surroundings/:_id", (req, res) => { 
  console.log("hey surroundings")
      Surroundings.findOne({ _id: req.params._id }, function (err, objFromMongoDB) { 
      if (err) 
          return res.json({ 
          result: false, 
          }); 
  
      var data = req.body; 
  
      if (objFromMongoDB === null) { 
          return res.json({ 
          result: false, 
          }); 
      } 
      Object.assign(objFromMongoDB, data); 
      objFromMongoDB.save().then( 
          (response) => { 
          res.json({ 
              result: response, 
          }); 
          }, 
          (error) => { 
          res.json({ 
              result: false, 
          }); 
          } 
      ); 
      }); 
  }); 
  // end UPDATE surroundings by id

// UPDATE streets by id
router.put("/streets/:_id", (req, res) => { 
  console.log("hey street")
      Streets.findOne({ _id: req.params._id }, function (err, objFromMongoDB) { 
      if (err) 
          return res.json({ 
          result: false, 
          }); 
  
      var data = req.body; 
  
      if (objFromMongoDB === null) { 
          return res.json({ 
          result: false, 
          }); 
      } 
      Object.assign(objFromMongoDB, data); 
      objFromMongoDB.save().then( 
          (response) => { 
          res.json({ 
              result: response, 
          }); 
          }, 
          (error) => { 
          res.json({ 
              result: false, 
          }); 
          } 
      ); 
      }); 
  }); 

  

//end PUT post by filepath (buildings)

//start PUT post by filepath (streets)
router.put("/streets/:_id", (req, res) => { 
  console.log("hey image")
  Streets.findOne({ filepath: req.params.filepath }, function (err, objFromMongoDB) { 
  if (err) 
      return res.json({ 
      result: false, 
      }); 

  var data = req.body; 

  if (objFromMongoDB === null) { 
      return res.json({ 
      result: false, 
      }); 
  } 
  Object.assign(objFromMongoDB, data); 
  objFromMongoDB.save().then( 
      (response) => { 
      res.json({ 
          result: response, 
      }); 
      }, 
      (error) => { 
      res.json({ 
          result: false, 
      }); 
      } 
  ); 
  }); 
  }); 
//end PUT post by filepath (streets)

//start PUT post by filepath (surroundings)
router.put("/surroundings/:_id", (req, res) => { 
  console.log("hey image")
  Surroundings.findOne({ filepath: req.params.filepath }, function (err, objFromMongoDB) { 
  if (err) 
      return res.json({ 
      result: false, 
      }); 

  var data = req.body; 

  if (objFromMongoDB === null) { 
      return res.json({ 
      result: false, 
      }); 
  } 
  Object.assign(objFromMongoDB, data); 
  objFromMongoDB.save().then( 
      (response) => { 
      res.json({ 
          result: response, 
      }); 
      }, 
      (error) => { 
      res.json({ 
          result: false, 
      }); 
      } 
  ); 
  }); 
  }); 
//end PUT post by filepath (surroundings)





























//Catch bad endpoints on the api route only
router.get("/*", (req, res) => {
  return res.json({ result: "not a valid endpoint" });
});

//post user profile to DB
router.post("/users", (req, res) => {
  console.log("add new user - endpoint called");
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

/////***START DELETE POSTS***

    //DELETE post by filepath (buildings)
    router.delete("/bss_username/:_id", (req, res) => { 
      console.table(req.params); 
      Buildings.deleteOne({ _id: req.params._id }, function (err, result) { 
      if (err) { 
          res.send(err); 
      } else { 
          res.send(result); 
      } 
      }); 
     });
    //end DELETE post by filepath (buildings)
 


    //DELETE post by filepath (streets)
    router.delete("/bss_username/:_id", (req, res) => { 
      console.table(req.params); 
      Streets.deleteOne({ _id: req.params._id }, function (err, result) { 
      if (err) { 
          res.send(err); 
      } else { 
          res.send(result); 
      } 
      }); 
    }); 
    //end DELETE post by filepath (streets)

    //DELETE post by filepath (surroundings)
    router.delete("/bss_username/:_id", (req, res) => { 
      console.table(req.params); 
      Surroundings.deleteOne({ _id: req.params._id }, function (err, result) { 
      if (err) { 
          res.send(err); 
      } else { 
          res.send(result); 
      } 
      }); 
    }); 
    //end DELETE post by filepath (surroundings)

    //start DELETE post by Collection & _id (buildings)
        router.delete("/buildings/:_id", (req, res) => { 
          console.table(req.params); 
          Buildings.deleteOne({ _id: req.params._id }, function (err, result) { 
          if (err) { 
              res.send(err); 
          } else { 
              res.send(result); 
          } 
          }); 
      }); 
      // end DELETE post by _id (buildings)
  
      // DELETE post by filepath (streets)
      router.delete("/streets/:_id", (req, res) => { 
          console.table(req.params); 
          Streets.deleteOne({ _id: req.params._id }, function (err, result) { 
          if (err) { 
              res.send(err); 
          } else { 
              res.send(result); 
          } 
          }); 
      }); 
      // end DELETE post by _id (streets)
  
      // DELETE post by _id (surroundings)
      router.delete("/surroundings/:filepath", (req, res) => { 
          console.table(req.params); 
          Surroundings.deleteOne({ _id: req.params._id }, function (err, result) { 
          if (err) { 
              res.send(err); 
          } else { 
              res.send(result); 
          } 
          }); 
      }); 
      // end DELETE post by _id (surroundings)
    
let PORT = 4000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
