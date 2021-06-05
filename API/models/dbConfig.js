const mongoose =require('mongoose');

mongoose.connect(
    "mongodb://localhost:27017/eCommerce",
    {useNewUrlParser: true, useUnifiedTopology: true},
    (err)=>{
        if(!err) console.log("Succesfully Connected To Database");
        else console.log("Connection error:" +err);
    }
)