/////***START GET COLLECTIONS***


    //start GET all (Buildings,Streets and Settings Collections)
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
    //end GET all (Buildings,Streets and Settings Collections)

    //start GET all (Buildings,Streets and Settings Collections & (term))
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
    //end GET all (Buildings,Streets and Settings Collections & (term))


    //***start GET Single Collection***

    //start GET all (Buildings)
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
    //end GET all (Buildings)

    //start GET all (Streets)
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
    //end GET all (Streets)

    //start GET all (Surroundings)
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
    //end GET all (Surroundings)

    //start GET all (Users)
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
    // end GET all (Users) 

    //***end GET Single Collection***

    //Catch bad endpoints on the api route only
    router.get("/*", (req, res) => {
        return res.json({ result: "not a valid endpoint" });
    });

/////***END GET COLLECTIONS***


