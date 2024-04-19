const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/User");
const fs = require("fs");
const ErrorHandler = require("../utils/ErrorHandler");
const sendMail = require("../utils/sendMail");
const jwt = require("jsonwebtoken");
const path = require("path");
const sendToken = require("../utils/sendToken");
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { Post } = require("../models/Post");

// s3 upload
const s3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

exports.register = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, password, username } = req.body;
    if(!name || !email || !password || !username){
      const key = req.file.key;
      const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: key,
      };
      await s3.send(new DeleteObjectCommand(params));

      return next(new ErrorHandler("enter all fields",400))
    }
    const userEmail = await User.findOne({ email });
    const userName = await User.findOne({ username });

    if (userEmail) {
    
        const key = req.file.key;
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
        };
        await s3.send(new DeleteObjectCommand(params));

      return next(new ErrorHandler("User email already exists", 400));
    }

    if (userName) {
      
        const key = req.file.key;
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
        };
        await s3.send(new DeleteObjectCommand(params));

      return next(new ErrorHandler("username already exists", 400));
    }

    const user = {
      name: name,
      email: email,
      password: password,
      username: username,
      avatar: req.file.location,
    };

    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:5173/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate Your Account",
        message: `Hello ${user.name}, please click on the link to activate your account : ${activationUrl}`,
      });

      res.status(201).json({
        success: true,
        message: `Please check your email: ${user.email} to activate your account!`,
      });

      // if user is not verified
      setTimeout(async () => {
        try {
          const user = await User.findOne({email})
          if(!user){
            const key = req.file.key;
            const params = {
                  Bucket: process.env.AWS_BUCKET_NAME,
                  Key: key,
              };
              await s3.send(new DeleteObjectCommand(params));
          }
        } catch (error) {
          console.log(error)
          res.status(500).json({ message: 'Upload failed' });
        }
    }, 5 * 60 * 1000); // Delete image after 5 minutes

    } catch (error) {
      console.log(error)
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    console.log(error)
    return next(new ErrorHandler(error.message, 500));
  }
});

const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

exports.activationAccount = catchAsyncErrors(async (req, res, next) => {
  try {
    const { activation_token } = req.body;
    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

    if (!newUser) return next(new ErrorHandler("Invalid token", 400));

    const { name, email, password, username, avatar } = newUser;
    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User already exists", 400));

    user = await User.create({
      name,
      email,
      password,
      username,
      avatar,
    });

    sendToken(user, 201, res, "Account activated successfully!");
    
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// login
exports.login = catchAsyncErrors(async (req, res, next) => {
  try {
    const { emailOrUsername, password } = req.body;
    
    if(!emailOrUsername|| !password) return next(new ErrorHandler("Please enter all fields",400));

    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    }).select("+password");

    if (!user) {
      return next(new ErrorHandler("User doesn't exists", 400));
    }
    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      return next(new ErrorHandler("Invalid credentials", 400));
    }
    sendToken(user, 200, res, `Welcome back ${user.name}`);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.getUser=catchAsyncErrors(async(req,res,next)=>{
 try {
  const {id} = req.user;
  console.log(id)
  const user = await User.findById(id);
  res.status(200).json({
    success:true,
    user
  })

 } catch (error) {
  return next(new ErrorHandler(error.message, 500));
 }
})
exports.logoutUser=catchAsyncErrors(async(req,res,next)=>{
 try {
  res.cookie("token",null,{
    expires:new Date(Date.now()),
    httpOnly:true,
  })
  res.status(200).json({
    success: true,
    message: "LogOut successfully!",
  });
 } catch (error) {
  return next(new ErrorHandler(error.message, 500));
 }
})


exports.getAllUsers=catchAsyncErrors(async(req,res,next)=>{
  try {
    const users = await User.find({});
    res.status(200).json({
      success:true,
      users
    })
  } catch (error) {
  return next(new ErrorHandler(error.message, 500));
  }
})

exports.getMyPosts=catchAsyncErrors(async(req,res,next)=>{
  try {
    const userId = req.user.id;
    const posts = await Post.find({user:userId}).populate('comments')
    res.status(200).json({
      success:true,
      posts
    })
  } catch (error) {
  return next(new ErrorHandler(error.message, 500));
  }
})