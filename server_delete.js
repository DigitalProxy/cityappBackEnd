//***START DELETE POSTS***


    //DELETE (all collections) post by (buildings & _id)
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
      //end DELETE post by (buildings & _id)
  
      //DELETE (all collections) post by (streets & _id)
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
      //end DELETE post by (streets & _id)
  
      //DELETE (all collections) post by (surroundings & _id)
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
      //end DELETE post by (surroundings & _id)

      //DELETE post by (single collection) (buildings & _id)
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
    // end DELETE post by (single collection) (buildings & _id)

    // DELETE post by (single collection) (streets & _id)
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
    // end DELETE post by (single collection) (streets & _id)

    // DELETE post by (single collection) (surroundings & _id)
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
    // end DELETE post by (single collection) (surroundings & _id)

    // DELETE post by (single collection )(user & username)
    router.delete("/users/:username", (req, res) => { 
        console.table(req.params); 
        Users.deleteOne({ username: req.params.username }, function (err, result) { 
        if (err) { 
            res.send(err); 
        } else { 
            res.send(result); 
        } 
        }); 
    }); 
    // end DELETE post by (single collection )(user & username)

//***END DELETE POSTS***