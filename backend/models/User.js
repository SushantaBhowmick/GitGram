const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name:{
        type:String,
        required:[true,"Please enter a name"],
    },
    username:{
        type:String,
        required:[true,"Please enter a username"],
        unique:[true,"Please enter a username"],
    },
    bio:{
        type:String,
    },
    avatar:{
        type: String,
        required:true,
      },
    email:{
        type:String,
        required:[true,"Please enter a email"],
        unique:[true,"Please enter a email"],
    },
    password:{
        type:String,
        required:[true,"Please enter a password"],
        minlength:[6,"Password must be at least 6 character"],
        select:false,
    },
    posts:[
        {
          type:mongoose.Schema.Types.ObjectId,
          ref:"Post",
  
        }
      ],
      followers:[
          {
              type:mongoose.Schema.Types.ObjectId,
              ref:"User",
      
            }
      ],
      following:[
          {
              type:mongoose.Schema.Types.ObjectId,
              ref:"User",
      
            }
      ],
      role:{
        type:String,
        default:"user"
      },
      resetPasswordToken: String,
      resetPasswordExpire: Date
  },
  { timestamps: true }
);

// hash password
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password=await bcrypt.hash(this.password,10)
})

// compare password
userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

//jwt token
userSchema.methods.getJwtToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

module.exports = mongoose.model("Users", userSchema);
