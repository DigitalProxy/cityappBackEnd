    // CREATE new writer 
    router.post("/writers", (req, res) => { 
        console.log("add new writer - endpoint called")
        // create instance writer model 
        var newwriter = new Writers(); 
        var reactForm = req.body; 
    
        // copy form data into instance. nice. 
        Object.assign(newwriter, reactForm); 
    
        // for debug only 
        console.log(">>> ", reactForm); 
    
        newwriter.save().then( 
        (result) => { 
            return res.json(result); 
        }, 
        () => { 
            return res.send("problem adding new writer"); 
        } 
        ); 
    }); 
     // end CREATE new writer 

    // UPDATE writer by id
    router.put("/writers/:id", (req, res) => { 
        console.log("hey writer")
            Writers.findOne({ id: req.params.id }, function (err, objFromMongoDB) { 
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
        // end UPDATE writer by id

    // DELETE writer by id
    router.delete("/writers/:id", (req, res) => { 
        console.table(req.params); 
        Writers.deleteOne({ username: req.params.username }, function (err, result) { 
        if (err) { 
            res.send(err); 
        } else { 
            res.send(result); 
        } 
        }); 
    }); 
    // end DELETE writer by id