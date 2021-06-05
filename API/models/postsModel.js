const mongoose = require('mongoose');

const PostsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    author:{
        type: String
    },
    message:{
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Posts',PostsSchema);