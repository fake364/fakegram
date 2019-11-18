const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    description: {type: String},
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    image: {type: String},
    comments: {type: Array},
    date:{type:Date,default:Date.now}
});
module.exports = mongoose.model('Post', PostSchema);