const User = require("../models/User");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");


exports.isAuthenticated=catchAsyncErrors(async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token) return next(new ErrorHandler("Please login to access this resource",401));
    

    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    if(!decoded.id) return next(new ErrorHandler("Token expired",401));
    req.user = await User.findById(decoded.id);

    next()
  
})