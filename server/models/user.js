/**
 * Created by baunov on 25/10/16.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: { type: String},
    email: { type: String},
    name: {type:String},
    rank: {type:Number, default: 0},
    citations:[
        {type: Schema.Types.ObjectId, ref: 'Citation'}
    ]
});

var User = mongoose.model('User', userSchema);

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