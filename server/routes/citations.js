/**
 * Created by baunov on 25/10/16.
 */
const express = require('express');
const _ = require("lodash");
const {ObjectId} = require('mongodb');
const Citation = require("../models/citation");

const router = express.Router();



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
module.exports = router;