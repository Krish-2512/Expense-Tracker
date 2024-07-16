// !User Registration
const asyncHandler = require('express-async-handler');   
const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
       //error handling for async functions

 const userController ={
    // !======================register==========
register:asyncHandler(async(req,res)=>{
const{username,email,password}=req.body;
console.log(req.body);
  
// !validate
    if(!username||!email||!password){
        throw new Error('Please all fields are required')
    }

//!check user already exist
const userExists = await User.findOne({email});
if(userExists){
    throw new Error('user already exists')
}

// !hash the user password
const salt = await bcrypt.genSalt(10);
const hashedPassword= await bcrypt.hash(password,salt);
const userCreated = await User.create({
     username,
     email,
    password:hashedPassword,
 })

// !send the response
res.json({
    username:userCreated.username,
    email:userCreated.email,
    id:userCreated._id
})

 }),

//!================login=============
login:asyncHandler(async(req,res)=>{
const {email,password}=req.body;
 const user = await User.findOne({email})
 if(!user){
    throw new Error('invalid token')
  
 }const isMatch = await bcrypt.compare(password,user.password)
 if(!isMatch){
    throw new Error('Invalid password')
 }
//!Generate a token
const token = jwt.sign({id:user._id},'anykey',{
    expiresIn:'30d',
})

// !send the response
res.json(
    {
        message:'Login Success',
        token,
        email:user.email,
        id:user._id,
        username:user.username
    }
)

}),
// !profile
profile:asyncHandler(async(req,res)=>{
    //console.log(req.user)
    const user = await User.findById(
        req.user)
    if(!user){
        throw new Error('user not found')
    }
    // !send the response
    res.json({username:user.username,email:user.email})
}),
// !update password
changePassword:asyncHandler(async(req,res)=>{
    const{newPassword}=req.body;




    const user = await User.findById(req.user);
    if(!user){
        throw new Error('user not found');
    }
    //!hashed the password before saving
    //!hashed the new password
   const salt= await bcrypt.genSalt(10);
   const hashedPassword= await bcrypt.hash(newPassword,salt); 
  
   
    user.password = hashedPassword;
    //!save the user
   await user.save();

    // Send the response
    res.json({ message: 'Password saved successfully' });
}),

// !update profile
updateProfile:asyncHandler(async(req,res)=>{
    const{email,username}=req.body
    const updatedUser = await User.findByIdAndUpdate(req.user,{
        username,
        email
    },{
        new:true
    })
    
   
    // !send the response
    res.json({message:'updated profile saved successfully',updatedUser})
   
})
 }
 module.exports = userController;
