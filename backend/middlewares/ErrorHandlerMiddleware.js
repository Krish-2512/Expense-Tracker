const errorHandler=(err,req,res,next)=>{
    res.json({
        message:err.message,                                 //coming from throw new Error
        stack:err.stack
    });

}
module.exports= errorHandler;