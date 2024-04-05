const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role:{
        type: String,
        default: "user",
      },
      addresses:[
        {
          country: {
            type: String,
          },
          city:{
            type: String,
          },
          address1:{
            type: String,
          },
          address2:{
            type: String,
          },
          zipCode:{
            type: Number,
          },
          addressType:{
            type: String,
          },
        }
      ],
    avatar: {
      type: String,
    //   it will change as per as requirement
    },
    status: {
      type: String,
      default: "student",
      enum:["student","employee","mentor"]
    },
    category: {
      type: String,
      required: true,
    },
    mentrosId:{
        type:String,
        requierd:true,
    },
    mentors:{
        type: Object,
        required:true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
