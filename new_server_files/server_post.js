/////***START CREATE POSTS***

    //start CREATE new post (buildings)
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
    //end CREATE new post (buildings)
  
    //start CREATE new post (streets)
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
    //end CREATE new post (streets)
  
    //start CREATE post (surroundings)
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
    //end CREATE  post (surroundings)

    //start CREATE post (users) 
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
    //end CREATE post (users)
  
/////***END CREATE POSTS***