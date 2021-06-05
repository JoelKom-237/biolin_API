const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Category = require('../models/categoryModel')

//GET ALL THE CATEGORIES
router.get('/', async (req, res) =>{
    try{
        Category
        .find()
        .then(
            docs => {
                const response ={
                    count: docs.length,
                    category: docs.map(doc =>{
                        return {
                            categoryName: doc.categoryName,
                            _id: doc._id,
                            request:{
                                type:'GET',
                                url: 'http://localhost:5500/category' +doc_id
                            }
                        }
                    })
                }
                res.status(200).json(response);
            })
    }catch (err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
})

//ADD A NEW CATEGORY
router.post('/', async (req, res) =>{
    const category = new Category({
        _id: new mongoose.Types.ObjectId,
        categoryName: req.body.categoryName
    })
    try{
        category
        .save()
        .then(
            result =>{
                console.log(result);
                res.status(201).json({
                    message: 'Category Successfully created',
                    createdCategory:{
                        _id: result._id,
                        categoryName: result.categoryName,
                        request:{
                            type: 'GET',
                            url:'http://localhost:5500/category' +result._id
                        }
                    }
                })
            }
        )}
        catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
})

//GET A SPECIFIC CATEGORY OF A PRODUCT
router.get('/:categorie', async (req, res) =>{
    try{
        Category
        .find({'productsController': req.params.categorie})
        .then(
            doc =>{
                console.log("From Database ", doc );
                if(doc){
                    res.status(200).json({
                        category:doc,
                        request:{
                            type: 'GET',
                            url: 'http://localhost:5500/category'
                        }
                    })
                } else {
                    res.status(404).json({
                        message: 'Not Valid Entry Found For Provided ID'
                    })
                }
            })
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
})

//DELETE A SPECIFIC CATEGORY
router.delete('/:categorie', async (req, res) =>{
    const id = req.params.categorie;
    try {
        Category
        .deleteOne({_id: id})
        .then({
            message: 'Category Deleted',
            request:{
                type:'POST',
                url: 'http://localhost:5500/category',
                body:{categoryName: String}
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
})

//UPDATE A CATEGORY
router.patch('/:categorie', async (req, res) =>{
    const id = req.params.categorie;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    try {
        Category
        .updateOne(
            {_id: id},
            {$set: updateOps}
            )
        .then(
            result=>{
                console.log(result);
                res.status(200).json({
                    message: 'Category Succesfully Updated',
                    request:{
                        type: 'GET',
                        url: 'https://localhost:5500/category' +id
                    }
                })
            }
        )
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        }) 
    }
})

module.exports = router;