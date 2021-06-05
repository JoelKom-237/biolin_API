const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    categoryName:{
        type: String,
        require: true
    }
})

module.export = mongoose.model('Category', CategorySchema);