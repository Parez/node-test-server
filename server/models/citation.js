/**
 * Created by baunov on 25/10/16.
 */
const mongoose = require('mongoose');

var citationSchema = mongoose.Schema({
    text: {type: String, required: true, minlength: 10, maxlength: 300},
    likes: { type: Number, min: 0, required: true, default: 0},
    dislikes: { type: Number, min: 0, required: true, default: 0},
    author: {type: String, required: true, default: "Unknown"},
    publisher: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    rank: {type: Number, required: true, default: 1},
    views: {type: Number, required: true, default: 0}
});

var Citation = mongoose.model('Citation', citationSchema);

module.exports = Citation;