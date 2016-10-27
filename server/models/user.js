/**
 * Created by baunov on 25/10/16.
 */
const mongoose = require('mongoose');
const validator = require("validator");
const Schema = mongoose.Schema;

var userSchema = Schema({
    username: {type: String, required: true},
    password: { 
        type: String,
        required: true,
        minlength: 6
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }],
    name: {type:String},
    rank: {type:Number, default: 0},
    citations:[
        {type: Schema.Types.ObjectId, ref: 'Citation'}
    ]
});

var User = mongoose.model('User', userSchema);
module.exports = User;


/*
module.exports.persistUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    User.findOne(query, callback);
};

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
    });
};
*/