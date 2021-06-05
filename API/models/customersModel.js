const mongoose = require('mongoose');

const CustomersSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    firstName:{
        type : String,
        require: true
    },
    lastName:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    phoneNumber:{
        type: String,
        require: true
    },
    adress:{
        type: String,
        require: true
    },
    posts:{
        type: String
    }
})

module.exports = mongoose.model('Customers',CustomersSchema);