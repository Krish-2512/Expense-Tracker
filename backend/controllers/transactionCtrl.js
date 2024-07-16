
const asyncHandler = require('express-async-handler');   

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Transaction = require('../model/Transaction');

       //error handling for async functions

 const transactionController ={
    // !======================add==========
create:asyncHandler(async(req,res)=>{
const{type,category,date,amount,description}=req.body;
if(!amount||!type||!date){
    throw new Error('Name and type are required for the category');
}
//!create
const transaction =await Transaction.create({
    user:req.user,
    type,
    category,
    amount,
    description,

});
res.status(201).json(transaction);
 }),

//!================lists=============
getFilteredTransactions:asyncHandler(async(req,res)=>{
const {startDate,endDate,type,category}=req.query;
const filter ={user:req.user};               //it's an object so we can add new properties ans values

if(startDate){
    filter.date={...filter.date,$gte:new Date(startDate)};                    //making copy of others filter
}
if(endDate){
    filter.date={...filter.date,$lte:new Date(endDate)};
}
if(type){
    filter.type=type;
}
if(category){
if(category==='ALL'){
    //send all categories no filter 

}else if(category==='uncategorized') filter.category='uncategorized';

else filter.category=category;
}
const transaction = await Transaction.find(filter).sort({date:-1});
res.json(transaction);
}),


//!update the transaction
update:asyncHandler(async(req,res)=>{
    const transaction = await Transaction.findById(req.params.id)
    if(transaction && transaction.user.toString()===req.user.toString()){
       (transaction.type=req.body.type||transaction.type);
       (transaction.category=req.body.category||transaction.category);
       (transaction.amount=req.body.amount||transaction.amount);
       (transaction.date=req.body.date||transaction.date);
       (transaction.description=req.body.description||transaction.description);
         const updatedTransaction = await transaction.save();
         res.json(updatedTransaction)

    }
        
}),



// !delete the transaction
delete:asyncHandler(async(req,res)=>{
    const transaction = await Transaction.findById(req.params.id)
    if(transaction && transaction.user.toString()===req.user.toString())
        await Transaction.findByIdAndDelete(req.params.id);
    res.json({message:"transaction is deleted"})
})



 }
 module.exports = transactionController;
