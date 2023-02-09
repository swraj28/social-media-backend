const express= require('express');
const app= express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const userRoute=require('./routes/users');
const authRoute=require('./routes/auth');

dotenv.config();

mongoose.set('strictQuery', true);

// Establishing the Database Connection 
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

// middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.get('/',(req,res)=>{
  res.send('<h1>Welcome to HomePage</h1>')
})

app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);


app.listen(8000, (err) => {
  if(err){
    console.log('Error While Loading the Server');
  }
  console.log("Backend server is running!");
});