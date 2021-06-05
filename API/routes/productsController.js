const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const  Products = require('../models/productsModel');

//GET ALL THE PRODUCTS 
router.get('/', async (req, res)=>{
    try{
         Products
        .find()
        .then(
            docs =>{
                const response ={
                count: docs.length,
                products: docs.map(doc =>{
                    return{
                        description: doc.description,
                        price: doc.price,
                        designation: doc.designation,
                        quantity: doc.quantity,
                        category: doc.category,
                        _id: doc._id,
                        request:{
                            type: 'GET',
                            url: "http://localhost:5500/products/" + doc._id
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

//ADD A PRODUCT
router.post('/',async (req, res)=>{
    const product = new Products({
        _id: new mongoose.Types.ObjectId,
        designation : req.body.designation,
        description : req.body.description,
        price : req.body.price,
        quantity : req.body.quantity,
        category : req.body.category
    });
try{
    product
   .save()
   .then(result =>{
    console.log(result);
    res.status(201).json({
        message : 'Created Product Succesfully',
        createdProduct : {
            _id: result._id,
            description: result.description,
            price: result.price,
            designation: result.designation,
            quantity: result.quantity,
            category: result.category,
            request: {
                type:'GET',
                url: "http://localhost:5500/products/" +result._id
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

//GET SPECIFIC PRODUCT
router.get('/:productId', async (req, res)=>{
    const id= req.params.productId;
    try{
      Products
      .findById(id)
      .then(doc =>{
        console.log("From database", doc);
        if(doc){
            res.status(200).json({
                product: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:5500/products'
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

//DELETE A PRODUCT
router.delete('/:productId', async (req, res) =>{
    const id = req.params.productId;
    try{
   Products
   .deleteOne({_id : id})
   .then({   
    message: 'Product deleted!',
    request:{
        type: 'POST',
        url: 'http://localhost:5500/products/',
        body: {description: String, price:Number, designation:String, quantity:Number, category:String}
    }
})
    } catch(err){
        console.log(err);
        res.status(500).json({
            error : err
        })
    }
});

//UPDATE A PRODUCT
router.patch('/:productId', async(req, res)=>{
    const id = req.params.productId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    try{
         Products.updateOne(
            {_id : id},
            {$set:updateOps}
             )
        .then( result =>{
            console.log(result);
            res.status(200).json({
                message: 'Product Updated!',
                request: {
                    type: 'GET',
                    url: 'http://localhost:5500/products/' +id
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