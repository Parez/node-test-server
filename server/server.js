/**
 * Created by baunov on 25/10/16.
 */
var express = require("express");
var bodyParser = require("body-parser");

var {mongoose} = require('./db/mongoose');
var citationRoutes = require('./routes/citations');

const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());

app.use("/citations", citationRoutes);

app.listen(port, () => {
    console.log(`Started from the bottom now we here (${port})`);
});
