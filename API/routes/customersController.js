const express = require ('express');
const router = express.Router();
const mongoose = require('mongoose');

const Customers = require('../models/customersModel');

//GET ALL THE CUSTOMERS
router.get('/', async (req, res)=>{
    try{
         Customers
        .find()
        .then(
            docs =>{
                const response ={
                count: docs.length,
                customers: docs.map(doc =>{
                    return{
                        firstName: doc.firstName,
                        lastName: doc.lastName,
                       email: doc.email,
                       phoneNumber: doc.phoneNumber,
                        adress: doc.adress,
                        posts: doc.posts,
                        _id: doc._id,
                        request:{
                            type: 'GET',
                            url: "http://localhost:5500/customers/" + doc._id
                        }
                    }
                })
            };
               res.status(200).json(response);
        })
        } catch(err){
            console.log(err)
            res.status(500).json({
                error: err
            })
        };
    });

//ADD A CUSTOMER
router.post('/',async (req, res)=>{
    const customer = new Customers({
        _id: new mongoose.Types.ObjectId,
       firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        phoneNumber : req.body.phoneNumber,
        adress : req.body.adress,
        posts: req.body.posts
    });
try{
    customer
   .save()
   .then(result =>{
    console.log(result);
    res.status(201).json({
        message : 'Customer Created Succesfully',
        createdCustomer : {
            _id: result._id,
            lastName: result.lastName,
            email: result.email,
           firstName: result.firstName,
            phoneNumber: result.phoneNumber,
            adress: result.adress,
            posts:result.posts,
            request: {
                type:'GET',
                url: "http://localhost:5500/customers/" +result._id
            }
        }
    });
})
    } catch(err)  {
        console.log(err)
        res.status(500).json({
            error : err
        })
    };
});


//GET SPECIFIC CUSTOMER
router.get('/:customerId', async (req, res)=>{
    const id= req.params.customerId;
    try{
      Customers
      .findById(id)
      .then(doc =>{
        console.log("From database", doc);
        if(doc){
            res.status(200).json({
                customer: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:5500/customers'
                }
            });
        } else {
            res.status(404).json({
                message : 'No valid Entry Found for Provided ID!'
            });
        }
    })
    } catch(err){
        console.log(err);
        res.status(500).json({error: err})
    }
});

//DELETE A CUSTOMER
router.delete('/:customerId', async (req, res) =>{
    const id = req.params.customerId;
    try{
   Customers
   .deleteOne({_id : id})
   .then({   
    message: 'Customer deleted!',
    request:{
        type: 'POST',
        url: 'http://localhost:5500/customers/',
        body: {firstName: String, lastName:String, email:String, phoneNumber:Number, adress:String, posts: String}
    }
})
    } catch(err){
        console.log(err);
        res.status(500).json({
            error : err
        })
    }
});

//UPDATE A CUSTOMER
router.patch('/:customerId', async(req, res)=>{
    const id = req.params.customerId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    try{
         Customers.updateOne(
            {_id : id},
            {$set:updateOps}
             )
        .then( result =>{
            console.log(result);
            res.status(200).json({
                message: 'Customer Updated!',
                request: {
                    type: 'GET',
                    url: 'http://localhost:5500/customers/' +id
                }
            });
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            error : err
        })
    }
})

module.exports = router;
