var bcrypt=require("bcrypt");

const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    phone: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    posts:[{type:mongoose.Schema.Types.ObjectId,ref:"Post"}]
});
const saltRounds = 10;
UserSchema.pre('save', function(next) {
    // Check if document is new or a new password has been set
    if (this.isNew || this.isModified('password')) {
        // Saving reference to this because of changing scopes
        const document = this;
        bcrypt.hash(document.password, saltRounds,
            function(err, hashedPassword) {
                if (err) {
                    next(err);
                }
                else {
                    document.password = hashedPassword;
                    next();
                }
            });
    } else {
        next();
    }
});
UserSchema.methods.isCorrectPassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err, same) {
        if (err) {
            callback(err);
        } else {
            callback(err, same);
        }
    });
}
module.exports = mongoose.model('user', UserSchema);