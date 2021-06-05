const mongoose = require('mongoose');

const ProductsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    description: {
        type: String,
        require: true
    },
    designation: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
});

module.exports = mongoose.model('Products',ProductsSchema);

