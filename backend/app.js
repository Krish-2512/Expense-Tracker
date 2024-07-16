const express = require('express');
const userRouter = require('./routes/userRouter');
const mongoose  = require('mongoose');
const errorHandler = require('./middlewares/ErrorHandlerMiddleware');
const categoryRouter = require('./routes/categoryRouter');
const transactionRouter = require('./routes/transactionRouter');
const app = express();
const cors =require('cors')
mongoose.connect('mongodb+srv://krish12252005:UwIun5sfWpiQs9jr@krish-cluster.vn4ka9f.mongodb.net/mern-expense').then(()=>console.log('mongodb is connected')).catch(e=>console.log(e))

//!middleware to get data to frontend in json format
app.use(express.json());


const corsOptions={
    origin:['http://localhost:5173']
}


app.use(cors(corsOptions));
// !Routes
app.use('/',userRouter)
app.use('/',categoryRouter)
app.use('/',transactionRouter)
app.use(errorHandler);

// !start the server
const Port = process.env.PORT||8000;
app.listen(Port,()=>{console.log(`Server is running on ${Port}`)});