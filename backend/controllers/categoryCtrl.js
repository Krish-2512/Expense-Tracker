
const asyncHandler = require('express-async-handler');   
const Category = require('../model/Category');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Transaction = require('../model/Transaction');
       //error handling for async functions

 const categoryController ={
    // !======================add==========
create:asyncHandler(async(req,res)=>{
const{name,type}=req.body;
if(!name||!type){
    throw new Error('Name and type are required for the category');
}
//convert the name to lowercase
const normalizedName= name.toLowerCase();
//!check if the user is valid
const validTypes=['income','expense']
if(!validTypes.includes(type.toLowerCase())){
    throw new Error('Invalid Category type'+type);
}
//!check if category already exists on the user
const categoryExists=await Category.findOne({name:normalizedName})
if(categoryExists){throw new Error (`Category ${categoryExists}already exists`)}
//!create the category
const category = await Category.create({
    name:normalizedName,
    user:req.user,
    type
})
res.status(201).json(category);
 }),

//!================lists=============
lists:asyncHandler(async(req,res)=>{
const categories = await Category.find({user:req.user});
res.status(200).json(categories)
}),






// !update
update:asyncHandler(async(req,res)=>{
    const {categoryId} = req.params;
    console.log('CategoryId from params:', categoryId); // Log the categoryId
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return res.status(400).json({ message: 'Invalid category ID' });
    }

    const{type,name,user}=req.body;
    const normalizedName= name.toLowerCase();
    const category = await Category.findById(categoryId)
if(!category&&category.user.toString()!==req.user.toString()){
    throw new Error('Category not found or user is unauthorized')
}

 // Check if the required fields are present
 if (!type) {
    return res.status(400).json({ message: 'Type is required' });
}
if (!name) {
    return res.status(400).json({ message: 'Name is required' });
}

const oldName=category.name;
// !update category properties
category.type=type;
category.name=normalizedName;
const updateCategory = await category.save();
if(oldName!==updateCategory.name){
   await Transaction.updateMany({
    user:req.user,
    category:oldName
   },{$set:{category:updateCategory.name}

   });
   res.json(updateCategory);
}
}),

// !delete
delete:asyncHandler(async(req,res)=>{
    const category= await Category.findById(req.params.id);
    if(category&&category.user.toString()===req.user.toString()){
           //update transaction that have category
    const defaultCategory= 'Uncategorized'
    await Transaction.updateMany({ user:req.user,
        category:category._id},{
            $set:{category:'Uncategorized'}
        })
        // !remove category
        await Category.findByIdAndDelete(req.params.id)
        res.json('Category is deleted')
    }else{
        res.json('Category not found or not authorized')   
    }
     

   
})
 }
 module.exports = categoryController;
