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

/////***START UPDATE POSTS***

    // UPDATE post by filepath (buildings)
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
        // end UPDATE post by filepath (buildings)

    // UPDATE post by filepath (streets)
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
        // end UPDATE post by filepath (streets)

    // UPDATE post by filepath (surroundings)
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
        // end UPDATE post by filepath (surroundings)

/////***END UPDATE POSTS***

/////***START DELETE POSTS***

    // DELETE post by filepath (buildings)
    router.delete("/buildings/:filepath", (req, res) => { 
        console.table(req.params); 
        Buildings.deleteOne({ filepath: req.params.filepath }, function (err, result) { 
        if (err) { 
            res.send(err); 
        } else { 
            res.send(result); 
        } 
        }); 
    }); 
    // end DELETE post by filepath (buildings)

    // DELETE post by filepath (streets)
    router.delete("/streets/:filepath", (req, res) => { 
        console.table(req.params); 
        Streets.deleteOne({ filepath: req.params.filepath }, function (err, result) { 
        if (err) { 
            res.send(err); 
        } else { 
            res.send(result); 
        } 
        }); 
    }); 
    // end DELETE post by filepath (streets)

    // DELETE post by filepath (surroundings)
    router.delete("/surroundings/:filepath", (req, res) => { 
        console.table(req.params); 
        Surroundings.deleteOne({ filepath: req.params.filepath }, function (err, result) { 
        if (err) { 
            res.send(err); 
        } else { 
            res.send(result); 
        } 
        }); 
    }); 
    // end DELETE post by filepath (surroundings)

/////***END DELETE POSTS***
