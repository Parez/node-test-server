/**
 * Created by baunov on 25/10/16.
 */
const express = require('express');
const _ = require("lodash");
const {ObjectId} = require('mongodb');
const User = require("../models/user");

const router = express.Router();


//Get user by ID
router.get("/:id", (req, res) => {
    var id = req.params.id;

    if(!ObjectId.isValid(id))
    {
        console.log(`ID ${id} is not valid`);
        res.status(404).send(`Error: ID ${id} is not valid`);
    }

    User.findById(id).then( (user) => {
        if(!user) res.status(404).send(`Error: User ${id} not found`);
        res.send(user);
    }).catch( (error) => {
        res.status(400).send(error);
    });
});


//Create new User in DB
router.post("/", (req, res) => {
    var user = new User(_.pick(req.body, ["email", "password", "username", "name"]));

    user.save().then( () => {
        return user.generateAuthToken();

    }).then((token) => {
        res.header("x-auth", token).send(user);
    }).catch( (error) => {
        res.status(400).send(error);
    });
});

module.exports = router;

/*
router.get("/", (req, res) => {
   Citation.find({}).then((docs) => {
       res.status(200).send(docs);
   }).catch( (error) => {
       res.status(400).send(error);
   })
});



router.post('/', (req, res) => {
    console.log(req.body);
    var citation = new Citation(_.pick(req.body, ["text", "author"]));

    citation.save().then(
        (doc) => {
            res.send(doc);
        },
        (error) => {
            res.status(400).send(error);
        }
    );
});

router.delete("/:id", (req, res) => {
    var id = req.params.id;

    if(!ObjectId.isValid(id))
    {
        console.log(`ID ${id} is not valid`);
        res.status(404).send(`Error: ID ${id} is not valid`);
    }
    
    Citation.findByIdAndRemove(id).then((doc) => {
        if(!doc)
        {
            res.status(404).send();
        }

        res.send(doc);
    }).catch( (error) => {
        res.status(400).send();
    })
});

router.patch("/like/:id", (req, res) => {
    var id = req.params.id;

    if(!ObjectId.isValid(id))
    {
        console.log(`ID ${id} is not valid`);
        res.status(404).send(`Error: ID ${id} is not valid`);
    }



    Citation.findByIdAndUpdate(id, {$inc: {likes: 1}}, {new: true}).then((citation) => {
        if(!citation) res.status(404).send();

        res.send({citation});
    }).catch( (error) => {
        res.status(400).send(error);
    });

    console.log(req.body);
});
*/

