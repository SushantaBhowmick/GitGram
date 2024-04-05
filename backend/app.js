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

// import Routes
const userRouter = require('./routes/userRoute');

app.use("/api/v2/user",userRouter)


//error handler
app.use(error)


module.exports = app;