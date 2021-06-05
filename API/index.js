const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./models/dbConfig');

const productsRoute = require('../API/routes/productsController')
const postsRoute = require('../API/routes/postsController');
const customersRoute = require('../API/routes/customersController');


app.use(bodyParser.json());
app.use('/products', productsRoute);
app.use('/posts', postsRoute);
app.use('/customers',customersRoute);
app.listen(5500, ()=> console.log("Server started: 5500"));

app.use((req, res, next) =>{
    const error = new Error('Not found');
    error.status= 404;
})

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message 
        }
    })
})