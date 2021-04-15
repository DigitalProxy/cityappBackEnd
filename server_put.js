
/////***START PUT POSTS***

    //start PUT post by filepath (buildings)
    router.put("/buildings/:filepath", (req, res) => { 
        console.log("hey image")
            Buildings.findOne({ filepath: req.params.filepath }, function (err, objFromMongoDB) { 
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
    router.put("/streets/:filepath", (req, res) => { 
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
    router.put("/surroundings/:filepath", (req, res) => { 
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

    //start PUT user by username
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
    //end PUT users by username

/////***END PUT POSTS***
