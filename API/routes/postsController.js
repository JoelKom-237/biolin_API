const express= require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Posts = require('../models/postsModel');


//GET ALL THE POSTS OF CUSTOMERS
router.get('/', async (req, res)=>{
    try{
         Posts
        .find()
        .then(
            docs =>{
                const response ={
                count: docs.length,
                posts: docs.map(doc =>{
                    return{
                        author: doc.author,
                       message: doc.message,
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

    //GET ALL THE POSTS BY CUSTOMER'S
router.get('/:authorOfPost', (req, res)=>{
    try{
        Posts
        .find({"customersController":req.params.authorOfPost})
        .then(doc =>{
            console.log("From database", doc);
            if(doc){
                res.status(200).json({
                    post: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:5500/posts'
                    }
                });
            } else {
                res.status(404).json({
                    message : 'No valid Entry Found for Provided ID!'
                });
            }
        })
    }catch(err){

    }
})

//ADD A POST
router.post('/',async (req, res)=>{
    const post = new Posts({
        _id: new mongoose.Types.ObjectId,
        author : req.body.author,
      message : req.body.message
    });
try{
    post
   .save()
   .then(result =>{
    console.log(result);
    res.status(201).json({
        message : 'Post  Succesfully Created ',
        createdPost : {
            _id: result._id,
            message: result.message,
            author: result.author,
            request: {
                type:'GET',
                url: "http://localhost:5500/posts/" +result._id
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

//DELETE A POST
router.delete('/:postId', async (req, res) =>{
    const id = req.params.postId;
    try{
   Posts
   .deleteOne({_id : id})
   .then({   
    message: 'Post deleted!',
    request:{
        type: 'POST',
        url: 'http://localhost:5500/posts/',
        body: {author: String,  message:String,}
    }
})
    } catch(err){
        console.log(err);
        res.status(500).json({
            error : err
        })
    }
});

module.exports = router;


