/**
 * Created by baunov on 25/10/16.
 */
const mongoose = require('mongoose');

const mongoURL = process.env.MONGODB_URI || 'mongodb://localhost:27017/citations';

mongoose.Promise = global.Promise;
mongoose.connect(mongoURL);

var db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));

//Logging once connected to database
db.once('open', function () {
    console.log('Connected to MongoDB');
});

module.exports = {mongoose};
