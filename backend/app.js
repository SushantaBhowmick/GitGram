const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const cors = require('cors')
const dotenv =require('dotenv');
const error = require('./middlewares/error');

const app = express()
dotenv.config({path:"config/config.env"});


//middleware
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}))
app.use(morgan("dev"));
app.use("*",cors({
    origin:true, 
    credentials:true,
  }));

app.get('/',(req,res)=>{
  res.send("Welcome to gitGram")
})

// import Routes
const userRouter = require('./routes/userRoute');
const postRouter = require('./routes/postRoutes');

app.use("/api/v2/user",userRouter)
app.use("/api/v2/post",postRouter)


//error handler
app.use(error)


module.exports = app;