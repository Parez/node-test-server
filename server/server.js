/**
 * Created by baunov on 25/10/16.
 */
const express = require("express");
const bodyParser = require("body-parser");

const {mongoose} = require('./db/mongoose');
const citationRoutes = require('./routes/citations');
const userRoutes = require('./routes/users');

const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());

app.use("/citations", citationRoutes);
app.use("/users", userRoutes);

app.listen(port, () => {
    console.log(`Started from the bottom now we here (${port})`);
});
