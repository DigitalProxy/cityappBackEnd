// CREATE new user 
    router.post("/users", (req, res) => { 
        console.log("add new user - endpoint called")
        // create instance writer model 
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
    // end CREATE new user


// UPDATE user by username
    router.put("/users/:username", (req, res) => { 
        console.log("hey user")
            Users.findOne({ id: req.params.id }, function (err, objFromMongoDB) { 
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
        // end UPDATE users by username

        
// DELETE user by username
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
    // end DELETE user by username